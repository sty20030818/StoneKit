<template>
	<!-- 输入区域岛屿 -->
	<div
		class="bg-white/70 backdrop-blur-xl rounded-[20px] border border-white/40 shadow-md shadow-teal-500/5 p-4 relative overflow-hidden transition-all duration-300"
		:class="[isDragging ? 'ring-2 ring-teal-400 scale-[1.01]' : 'hover:shadow-lg hover:-translate-y-0.5']"
		@dragover.prevent="onDragOver"
		@dragleave.prevent="onDragLeave"
		@drop.prevent="onDrop"
		@click="openFileDialog">
		<!-- 拖放区域 -->
		<div
			class="border border-dashed rounded-[14px] py-4 px-6 flex items-center gap-4 transition-all duration-300 cursor-pointer"
			:class="[
				isDragging
					? 'border-teal-400 bg-teal-50/80'
					: 'border-slate-200 bg-slate-50/30 hover:border-teal-300 hover:bg-teal-50/50',
			]">
			<!-- 图标 -->
			<div
				class="w-10 h-10 rounded-[10px] bg-linear-to-br from-teal-100 to-emerald-100 flex items-center justify-center shrink-0 transition-transform duration-300"
				:class="{ 'scale-110': isDragging }">
				<UIcon
					name="i-lucide-image-plus"
					class="size-5 text-teal-500" />
			</div>

			<!-- 文案 -->
			<div class="flex-1 min-w-0">
				<p class="text-sm font-medium text-slate-600">点击或拖放添加图片</p>
				<p class="text-xs text-slate-400 mt-0.5">支持 PNG、JPEG、WebP，可多选</p>
			</div>

			<!-- 图片数量 -->
			<UBadge
				v-if="(fileCount ?? 0) > 0"
				variant="soft"
				color="teal">
				{{ fileCount }} 张
			</UBadge>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { open } from '@tauri-apps/plugin-dialog'
	import { invoke } from '@tauri-apps/api/core'

	const props = defineProps<{
		fileCount?: number
	}>()

	const emit = defineEmits<{
		(e: 'files-added', files: File[]): void
		(e: 'file-paths-added', paths: Array<{ path: string; name: string; size: number }>): void
		(e: 'thumbnail-loaded', data: { path: string; thumbnail: string }): void
	}>()

	const isDragging = ref(false)

	const onDragOver = () => {
		isDragging.value = true
	}

	const onDragLeave = () => {
		isDragging.value = false
	}

	/**
	 * 处理拖放文件 - 使用 Tauri 命令获取文件信息
	 */
	const onDrop = async (e: DragEvent) => {
		isDragging.value = false
		const files = e.dataTransfer?.files
		if (files && files.length > 0) {
			// 拖放时无法获取真实路径，使用浏览器 File 对象
			// 这种情况下需要通过前端处理
			const imageFiles = Array.from(files).filter((f) => f.type.startsWith('image/'))
			if (imageFiles.length > 0) {
				emit('files-added', imageFiles)
			}
		}
	}

	/**
	 * 使用 Tauri 文件对话框选择文件
	 */
	const openFileDialog = async () => {
		try {
			const selected = await open({
				multiple: true,
				filters: [
					{
						name: '图片',
						extensions: ['png', 'jpg', 'jpeg', 'webp'],
					},
				],
			})

			if (selected && selected.length > 0) {
				// 并行获取所有文件的元数据（比串行快很多）
				const filePromises = selected.map(async (filePath) => {
					const name = filePath.split('/').pop() || filePath.split('\\').pop() || 'unknown'
					try {
						const metadata = await invoke<{ size: number }>('get_file_metadata', { path: filePath })
						return { path: filePath, name, size: metadata.size }
					} catch (err) {
						console.error('Failed to get file metadata:', err)
						return { path: filePath, name, size: 0 }
					}
				})

				const filePaths = await Promise.all(filePromises)

				if (filePaths.length > 0) {
					// 立即添加文件
					emit('file-paths-added', filePaths)

					// 并行获取所有缩略图（不阻塞，后台更新）
					filePaths.forEach((file) => {
						invoke<string>('get_image_thumbnail', { path: file.path, maxSize: 100 })
							.then((thumbnail) => {
								emit('thumbnail-loaded', { path: file.path, thumbnail })
							})
							.catch((err) => {
								console.warn('Failed to get thumbnail:', err)
							})
					})
				}
			}
		} catch (err) {
			console.error('Failed to open file dialog:', err)
		}
	}
</script>
