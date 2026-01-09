import { ref, computed } from 'vue'
import type { CompressTask, TaskStatus } from '../types'

/**
 * 生成唯一 ID
 */
const generateId = () => `task-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

// 全局状态（单例模式）
const tasks = ref<CompressTask[]>([])
const jobId = ref<string | null>(null)
const _isRunning = ref(false) // 真正的"正在运行"状态

/**
 * 任务队列管理 composable（单例状态）
 */
export function useTaskQueue() {
	// 计算属性
	const pendingTasks = computed(() => tasks.value.filter((t) => t.status === 'pending'))
	const processingTasks = computed(() => tasks.value.filter((t) => t.status === 'processing'))
	const completedTasks = computed(() => tasks.value.filter((t) => t.status === 'done'))
	const errorTasks = computed(() => tasks.value.filter((t) => t.status === 'error'))

	const totalCount = computed(() => tasks.value.length)
	const completedCount = computed(() => completedTasks.value.length)
	// isProcessing 只在真正运行时才为 true
	const isProcessing = computed(() => _isRunning.value)

	// 统计
	const totalOriginalSize = computed(() => tasks.value.reduce((sum, t) => sum + t.originalSize, 0))

	const totalCompressedSize = computed(() => completedTasks.value.reduce((sum, t) => sum + (t.compressedSize || 0), 0))

	const totalSavedSize = computed(() => {
		const originalOfCompleted = completedTasks.value.reduce((sum, t) => sum + t.originalSize, 0)
		return originalOfCompleted - totalCompressedSize.value
	})

	const averageSavingsPercent = computed(() => {
		if (completedTasks.value.length === 0) return 0
		const sum = completedTasks.value.reduce((acc, t) => acc + (t.savingsPercent || 0), 0)
		return Math.round(sum / completedTasks.value.length)
	})

	/**
	 * 设置运行状态
	 */
	const setRunning = (running: boolean) => {
		_isRunning.value = running
	}

	/**
	 * 添加文件到队列
	 */
	const addFiles = async (files: File[]) => {
		const newTasks: CompressTask[] = await Promise.all(
			files.map(async (file) => {
				// 生成缩略图
				const thumbnail = await createThumbnail(file)

				return {
					id: generateId(),
					fileName: file.name,
					filePath: '', // 前端 File 对象没有真实路径
					originalSize: file.size,
					status: 'pending' as TaskStatus,
					progress: 0,
					thumbnail,
				}
			}),
		)

		tasks.value = [...tasks.value, ...newTasks]
	}

	/**
	 * 添加文件路径到队列（来自 Tauri 文件对话框）
	 */
	const addFilePaths = async (
		filePaths: Array<{
			path: string
			name: string
			size: number
			thumbnail?: string
		}>,
	) => {
		const newTasks: CompressTask[] = filePaths.map((file) => ({
			id: generateId(),
			fileName: file.name,
			filePath: file.path,
			originalSize: file.size,
			status: 'pending' as TaskStatus,
			progress: 0,
			thumbnail: file.thumbnail,
		}))

		tasks.value = [...tasks.value, ...newTasks]
	}

	/**
	 * 更新任务状态
	 */
	const updateTask = (taskId: string, updates: Partial<CompressTask>) => {
		const index = tasks.value.findIndex((t) => t.id === taskId)
		if (index !== -1) {
			const updated = [...tasks.value]
			updated[index] = { ...updated[index], ...updates }
			tasks.value = updated
		}
	}

	/**
	 * 通过文件路径更新缩略图
	 */
	const updateThumbnailByPath = (filePath: string, thumbnail: string) => {
		const index = tasks.value.findIndex((t) => t.filePath === filePath)
		if (index !== -1) {
			const updated = [...tasks.value]
			updated[index] = { ...updated[index], thumbnail }
			tasks.value = updated
		}
	}

	/**
	 * 移除任务
	 */
	const removeTask = (taskId: string) => {
		tasks.value = tasks.value.filter((t) => t.id !== taskId)
	}

	/**
	 * 清空队列
	 */
	const clearAll = () => {
		tasks.value = []
		jobId.value = null
		_isRunning.value = false
	}

	/**
	 * 清空已完成
	 */
	const clearCompleted = () => {
		tasks.value = tasks.value.filter((t) => t.status !== 'done')
	}

	/**
	 * 重试失败任务
	 */
	const retryFailed = () => {
		const updated = tasks.value.map((task) => {
			if (task.status === 'error') {
				return { ...task, status: 'pending' as TaskStatus, progress: 0, error: undefined }
			}
			return task
		})
		tasks.value = updated
	}

	/**
	 * 创建缩略图
	 */
	const createThumbnail = (file: File): Promise<string> => {
		return new Promise((resolve) => {
			const reader = new FileReader()
			reader.onload = (e) => {
				resolve(e.target?.result as string)
			}
			reader.onerror = () => resolve('')
			reader.readAsDataURL(file)
		})
	}

	return {
		tasks,
		jobId,
		pendingTasks,
		processingTasks,
		completedTasks,
		errorTasks,
		totalCount,
		completedCount,
		isProcessing,
		totalOriginalSize,
		totalCompressedSize,
		totalSavedSize,
		averageSavingsPercent,
		setRunning,
		addFiles,
		addFilePaths,
		updateTask,
		updateThumbnailByPath,
		removeTask,
		clearAll,
		clearCompleted,
		retryFailed,
	}
}
