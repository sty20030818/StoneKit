<template>
	<!-- 任务项组件 -->
	<div
		class="group bg-white rounded-[14px] p-3 border transition-all duration-200 flex items-center gap-3 cursor-pointer hover:shadow-sm"
		:class="statusClass">
		<!-- 缩略图 -->
		<div class="w-12 h-12 rounded-[10px] bg-slate-100 overflow-hidden shrink-0 relative">
			<img
				v-if="task.thumbnail"
				:src="task.thumbnail"
				:alt="task.fileName"
				class="w-full h-full object-cover" />
			<div
				v-else
				class="w-full h-full flex items-center justify-center">
				<UIcon
					name="i-lucide-image"
					class="size-5 text-slate-300" />
			</div>
			<div
				v-if="task.status === 'processing'"
				class="absolute inset-0 bg-black/20 flex items-center justify-center">
				<UIcon
					name="i-lucide-loader-2"
					class="size-4 text-white animate-spin" />
			</div>
		</div>

		<!-- 信息区域 -->
		<div class="flex-1 min-w-0">
			<p class="text-sm font-medium text-slate-700 truncate">{{ task.fileName }}</p>
			<div class="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
				<span>{{ formatSize(task.originalSize) }}</span>
				<template v-if="task.status === 'done'">
					<UIcon
						name="i-lucide-arrow-right"
						class="size-3" />
					<span class="text-teal-600 font-medium">{{ formatSize(task.compressedSize || 0) }}</span>
					<UBadge
						v-if="task.savingsPercent"
						variant="soft"
						color="emerald"
						size="xs">
						-{{ task.savingsPercent }}%
					</UBadge>
				</template>
				<template v-else-if="task.status === 'processing'">
					<span class="text-teal-500">处理中...</span>
				</template>
				<template v-else-if="task.status === 'error'">
					<span class="text-rose-500">{{ task.error || '失败' }}</span>
				</template>
			</div>

			<!-- 进度条 - 使用 indeterminate 模式显示处理中动画 -->
			<div
				v-if="task.status === 'processing'"
				class="mt-2">
				<UProgress
					:model-value="undefined"
					color="teal"
					size="xs"
					animation="carousel" />
			</div>
		</div>

		<!-- 状态/操作 -->
		<div class="shrink-0 flex items-center">
			<UButton
				v-if="task.status === 'pending'"
				variant="ghost"
				color="gray"
				icon="i-lucide-x"
				size="xs"
				class="rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
				@click="emit('remove', task.id)" />
			<UButton
				v-else-if="task.status === 'processing'"
				variant="ghost"
				color="gray"
				icon="i-lucide-x"
				size="xs"
				class="rounded-full"
				@click="emit('cancel', task.id)" />
			<div
				v-else-if="task.status === 'done'"
				class="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center">
				<UIcon
					name="i-lucide-check"
					class="size-3.5 text-emerald-500" />
			</div>
			<UButton
				v-else-if="task.status === 'error'"
				variant="soft"
				color="rose"
				icon="i-lucide-refresh-cw"
				size="xs"
				class="rounded-full"
				@click="emit('retry', task.id)" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue'
	import type { CompressTask } from '../types'

	const props = defineProps<{
		task: CompressTask
	}>()

	const emit = defineEmits<{
		(e: 'remove', id: string): void
		(e: 'cancel', id: string): void
		(e: 'retry', id: string): void
	}>()

	const statusClass = computed(() => {
		switch (props.task.status) {
			case 'done':
				return 'border-emerald-100 bg-emerald-50/30'
			case 'error':
				return 'border-rose-100 bg-rose-50/30'
			case 'processing':
				return 'border-teal-100 bg-teal-50/30'
			default:
				return 'border-slate-100 hover:border-teal-100 hover:bg-teal-50/20'
		}
	})

	const formatSize = (bytes: number): string => {
		if (bytes === 0) return '0 B'
		const k = 1024
		const sizes = ['B', 'KB', 'MB', 'GB']
		const i = Math.floor(Math.log(bytes) / Math.log(k))
		return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
	}
</script>
