<template>
	<!-- 任务列表岛屿 -->
	<div
		class="bg-white/70 backdrop-blur-xl rounded-[28px] border border-white/40 shadow-lg overflow-hidden flex flex-col min-h-0">
		<!-- 标题栏 -->
		<div class="px-5 py-3 border-b border-slate-100/60 flex justify-between items-center shrink-0">
			<div class="flex items-center gap-2">
				<div
					class="w-7 h-7 rounded-[8px] bg-linear-to-br from-teal-100 to-emerald-100 flex items-center justify-center">
					<UIcon
						name="i-lucide-list-todo"
						class="size-4 text-teal-600" />
				</div>
				<span class="font-semibold text-slate-700 text-sm">处理队列</span>
				<UBadge
					v-if="tasks.length > 0"
					variant="soft"
					color="teal"
					size="xs">
					{{ tasks.length }}
				</UBadge>
			</div>
			<button
				v-if="completedCount > 0"
				class="text-xs text-slate-500 hover:text-teal-600 transition-colors px-2 py-1 rounded-lg hover:bg-slate-100"
				@click="emit('clear-completed')">
				清除已完成
			</button>
		</div>

		<!-- 主内容区域：任务列表或空状态 -->
		<div class="flex-1 overflow-y-auto min-h-0">
			<!-- 有任务时显示列表 -->
			<div
				v-if="tasks.length > 0"
				class="p-3 space-y-2">
				<TransitionGroup
					name="task-list"
					tag="div"
					class="space-y-2">
					<TaskItem
						v-for="task in tasks"
						:key="task.id"
						:task="task"
						@remove="emit('remove', $event)"
						@cancel="emit('cancel', $event)"
						@retry="emit('retry', $event)" />
				</TransitionGroup>
			</div>

			<!-- 空状态：居中显示 -->
			<div
				v-else
				class="h-full flex flex-col items-center justify-center p-6 text-center">
				<div class="w-16 h-16 rounded-[20px] bg-slate-50 flex items-center justify-center mb-3">
					<UIcon
						name="i-lucide-inbox"
						class="size-8 text-slate-200" />
				</div>
				<p class="text-sm text-slate-400">暂无待处理任务</p>
				<p class="text-xs text-slate-300 mt-1">拖放或选择图片开始</p>
			</div>
		</div>

		<!-- 底部统计 -->
		<div
			v-if="tasks.length > 0"
			class="px-5 py-3 border-t border-slate-100/60 shrink-0">
			<div class="flex justify-between text-xs text-slate-500">
				<span>{{ completedCount }}/{{ tasks.length }} 已完成</span>
				<span
					v-if="isProcessing"
					class="flex items-center gap-1">
					<UIcon
						name="i-lucide-loader-2"
						class="size-3 animate-spin" />
					处理中...
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import TaskItem from './TaskItem.vue'
	import type { CompressTask } from '../types'

	defineProps<{
		tasks: CompressTask[]
		completedCount: number
		isProcessing: boolean
	}>()

	const emit = defineEmits<{
		(e: 'remove', id: string): void
		(e: 'cancel', id: string): void
		(e: 'retry', id: string): void
		(e: 'clear-completed'): void
	}>()
</script>

<style scoped>
	.task-list-enter-active,
	.task-list-leave-active {
		transition: all 0.3s ease;
	}

	.task-list-enter-from,
	.task-list-leave-to {
		opacity: 0;
		transform: translateX(-20px);
	}

	.task-list-move {
		transition: transform 0.3s ease;
	}
</style>
