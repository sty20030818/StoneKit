import { ref } from 'vue'
import { invoke } from '@tauri-apps/api/core'
import { listen, type UnlistenFn } from '@tauri-apps/api/event'
import type { CompressOptions, ProgressEvent } from '../types'
import { useTaskQueue } from './useTaskQueue'

/**
 * 图片压缩器核心 composable
 * 与 Tauri Rust 后端通信
 */
export function useCompressor() {
	const queue = useTaskQueue()
	const currentJobId = ref<string | null>(null)
	const isCancelled = ref(false)
	let unlistenProgress: UnlistenFn | null = null

	/**
	 * 初始化事件监听
	 */
	const initEventListener = async () => {
		console.log('[Compressor] 初始化事件监听...')
		unlistenProgress = await listen<ProgressEvent>('compress_progress', (event) => {
			console.log('[Compressor] 收到进度事件:', event.payload)
			handleProgress(event.payload)
		})
		console.log('[Compressor] 事件监听已就绪')
	}

	/**
	 * 清理事件监听
	 */
	const cleanupEventListener = () => {
		if (unlistenProgress) {
			unlistenProgress()
			unlistenProgress = null
		}
	}

	/**
	 * 开始压缩任务
	 */
	const startCompression = async (options: CompressOptions) => {
		console.log('[Compressor] 开始压缩, pendingTasks:', queue.pendingTasks.value.length)
		if (queue.pendingTasks.value.length === 0) return

		isCancelled.value = false
		queue.setRunning(true)

		// 确保事件监听已初始化
		if (!unlistenProgress) {
			await initEventListener()
		}

		// 获取待处理的文件路径
		const inputs = queue.pendingTasks.value.map((t) => ({
			task_id: t.id,
			path: t.filePath || t.fileName, // 如果没有路径，使用文件名（仅用于演示）
		}))

		console.log('[Compressor] 待压缩文件:', inputs)

		// 注意：不再预先标记所有任务为 processing
		// Rust 后端会在开始处理每个文件时发送 processing 事件

		try {
			// 调用 Rust 后端开始压缩
			console.log('[Compressor] 调用 Rust compress_start...')
			const jobId = await invoke<string>('compress_start', {
				inputs,
				options: {
					format: options.format,
					quality: options.quality,
					max_side: options.maxSide,
					lossless: options.lossless,
					strip_exif: options.stripExif,
					preserve_alpha: options.preserveAlpha,
					png_quant_quality: options.pngQuantQuality,
				},
			})

			console.log('[Compressor] 压缩任务已启动, jobId:', jobId)
			currentJobId.value = jobId
			queue.jobId.value = jobId
		} catch (error) {
			console.error('[Compressor] 启动压缩失败:', error)
			queue.setRunning(false)
			// 标记所有处理中的任务为错误
			queue.processingTasks.value.forEach((task) => {
				queue.updateTask(task.id, {
					status: 'error',
					error: String(error),
				})
			})
		}
	}

	/**
	 * 取消压缩任务
	 */
	const cancelCompression = async () => {
		queue.setRunning(false)

		if (currentJobId.value) {
			try {
				await invoke('compress_cancel', { jobId: currentJobId.value })
			} catch (error) {
				console.error('Failed to cancel compression:', error)
			}
		}

		// 将所有处理中的任务标记为 pending
		queue.processingTasks.value.forEach((task) => {
			queue.updateTask(task.id, { status: 'pending', progress: 0 })
		})

		currentJobId.value = null
	}

	/**
	 * 处理进度事件
	 */
	const handleProgress = (event: ProgressEvent) => {
		const { taskId, status, bytesBefore, bytesAfter, error, done, total } = event

		console.log(`[Compressor] 处理进度事件: taskId=${taskId}, status=${status}, done=${done}/${total}`)

		if (status === 'processing') {
			// 处理中状态（Rust 开始处理这个文件时发送）
			console.log(`[Compressor] 将任务 ${taskId} 设置为 processing 状态`)
			queue.updateTask(taskId, {
				status: 'processing',
				progress: 30, // 显示正在处理
			})
		} else if (status === 'done') {
			const savingsPercent = bytesBefore > 0 ? Math.round(((bytesBefore - bytesAfter) / bytesBefore) * 100) : 0

			queue.updateTask(taskId, {
				status: 'done',
				progress: 100,
				compressedSize: bytesAfter,
				savingsPercent,
			})

			// 检查是否所有任务都完成了
			if (done === total) {
				queue.setRunning(false)
				currentJobId.value = null
				console.log('[Compressor] 所有任务完成!')
				// 计算实际节省的字节数
				const completedList = queue.completedTasks.value
				const originalTotal = completedList.reduce((sum, t) => sum + t.originalSize, 0)
				const compressedTotal = completedList.reduce((sum, t) => sum + (t.compressedSize || 0), 0)
				const saved = originalTotal - compressedTotal
				// 发送完成事件（由页面组件处理 toast）
				onAllCompleted?.(total, saved)
			}
		} else if (status === 'error') {
			queue.updateTask(taskId, {
				status: 'error',
				error: error || '压缩失败',
			})

			// 检查是否所有任务都处理完了
			if (done === total) {
				queue.setRunning(false)
				currentJobId.value = null
			}
		}
	}

	// 完成回调
	let onAllCompleted: ((count: number, savedBytes: number) => void) | null = null

	const setOnAllCompleted = (callback: (count: number, savedBytes: number) => void) => {
		onAllCompleted = callback
	}

	return {
		...queue,
		currentJobId,
		isCancelled,
		initEventListener,
		cleanupEventListener,
		startCompression,
		cancelCompression,
		handleProgress,
		setOnAllCompleted,
	}
}
