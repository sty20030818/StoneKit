<template>
	<ToolPageLayout>
		<div class="compressor-layout h-full">
			<!-- 左侧：流水线区域 -->
			<div class="left-panel flex flex-col gap-3 min-h-0">
				<!-- 输入区域（紧凑） -->
				<InputIsland
					:file-count="totalCount"
					@files-added="handleFilesAdded"
					@file-paths-added="handleFilePathsAdded"
					@thumbnail-loaded="handleThumbnailLoaded" />

				<!-- 任务列表（占主要空间） -->
				<TaskListIsland
					:tasks="tasks"
					:completed-count="completedCount"
					:is-processing="isProcessing"
					class="flex-1 min-h-0"
					@remove="removeTask"
					@cancel="handleCancel"
					@retry="handleRetry"
					@clear-completed="clearCompleted" />

				<!-- 输出区域（紧凑） -->
				<OutputIsland
					:completed-count="completedCount"
					:total-saved="totalSavedSize"
					:avg-savings="averageSavingsPercent"
					@download-all="handleDownloadAll" />
			</div>

			<!-- 右侧：设置区域 -->
			<div class="right-panel flex flex-col gap-3 min-h-0">
				<!-- 参数面板 -->
				<SettingsIsland
					v-model:options="compressOptions"
					class="flex-1 min-h-0" />

				<!-- 操作按钮 -->
				<ActionIsland
					:is-processing="isProcessing"
					:task-count="totalCount"
					:pending-count="pendingTasks.length"
					@start="handleStart"
					@pause="handlePause"
					@cancel="handleCancelAll"
					@clear="clearAll" />
			</div>
		</div>
	</ToolPageLayout>
</template>

<script setup lang="ts">
	import { ref, onMounted, onUnmounted } from 'vue'
	import { useToast } from '@nuxt/ui/composables'
	import ToolPageLayout from '@/shared/components/ToolPageLayout.vue'
	import InputIsland from './components/InputIsland.vue'
	import TaskListIsland from './components/TaskListIsland.vue'
	import OutputIsland from './components/OutputIsland.vue'
	import SettingsIsland from './components/SettingsIsland.vue'
	import ActionIsland from './components/ActionIsland.vue'
	import { useCompressor } from './composables/useCompressor'
	import type { CompressOptions } from './types'

	const toast = useToast()

	// 压缩器状态
	const {
		tasks,
		pendingTasks,
		totalCount,
		completedCount,
		isProcessing,
		totalSavedSize,
		averageSavingsPercent,
		addFiles,
		addFilePaths,
		updateThumbnailByPath,
		removeTask,
		clearAll,
		clearCompleted,
		startCompression,
		cancelCompression,
		initEventListener,
		cleanupEventListener,
		setOnAllCompleted,
	} = useCompressor()

	// 格式化字节大小
	const formatBytes = (bytes: number): string => {
		if (bytes === 0) return '0 B'
		const k = 1024
		const sizes = ['B', 'KB', 'MB', 'GB']
		const i = Math.floor(Math.log(bytes) / Math.log(k))
		return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
	}

	// 初始化事件监听和完成回调
	onMounted(() => {
		initEventListener()
		setOnAllCompleted((count, savedBytes) => {
			toast.add({
				title: '压缩完成！',
				description: `成功处理 ${count} 张图片，节省 ${formatBytes(savedBytes)}`,
				color: 'success',
				icon: 'i-lucide-check-circle',
			})
		})
	})

	onUnmounted(() => {
		cleanupEventListener()
	})

	// 压缩选项
	const compressOptions = ref<CompressOptions>({
		format: 'webp',
		quality: 100,
		lossless: true,
		stripExif: true,
		preserveAlpha: true,
		pngQuantQuality: 75,
	})

	// 处理浏览器拖放文件（无真实路径，暂不支持压缩）
	const handleFilesAdded = (files: File[]) => {
		addFiles(files)
	}

	// 处理 Tauri 文件对话框选择的文件（有真实路径）
	const handleFilePathsAdded = (
		paths: Array<{
			path: string
			name: string
			size: number
		}>,
	) => {
		addFilePaths(paths)
	}

	// 处理缩略图加载完成
	const handleThumbnailLoaded = (data: { path: string; thumbnail: string }) => {
		updateThumbnailByPath(data.path, data.thumbnail)
	}

	// 开始压缩（用户手动点击）
	const handleStart = () => {
		startCompression(compressOptions.value)
	}

	const handlePause = () => {
		console.log('Pause not implemented yet')
	}

	const handleCancel = (taskId: string) => {
		removeTask(taskId)
	}

	const handleRetry = (taskId: string) => {
		console.log('Retry task:', taskId)
	}

	const handleCancelAll = () => {
		cancelCompression()
	}

	const handleDownloadAll = () => {
		console.log('Download all completed tasks')
	}
</script>

<style scoped>
	.compressor-layout {
		display: grid;
		grid-template-columns: 1fr 360px;
		gap: 1.25rem;
	}

	.left-panel {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		min-height: 0;
	}

	.right-panel {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		min-height: 0;
	}

	@media (max-width: 1024px) {
		.compressor-layout {
			grid-template-columns: 1fr;
			grid-template-rows: auto 1fr auto auto;
		}

		.right-panel {
			order: -1;
		}
	}
</style>
