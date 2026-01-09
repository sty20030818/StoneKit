<template>
	<!-- 操作按钮岛屿 -->
	<div class="bg-linear-to-r from-teal-500 to-emerald-500 rounded-[28px] p-5 shadow-xl shadow-teal-500/30">
		<!-- 主按钮 -->
		<button
			class="w-full h-12 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-200"
			:class="[
				canStart
					? 'bg-white text-teal-600 shadow-lg shadow-white/30 hover:shadow-xl hover:scale-[1.02]'
					: 'bg-white/20 text-white/60 cursor-not-allowed',
			]"
			:disabled="!canStart && !isProcessing"
			@click="emit('start')">
			<UIcon
				v-if="isProcessing"
				name="i-lucide-loader-2"
				class="size-5 animate-spin" />
			<UIcon
				v-else
				name="i-lucide-zap"
				class="size-5" />
			{{ buttonText }}
		</button>

		<!-- 次要操作 -->
		<div class="flex gap-2 mt-3">
			<button
				class="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-medium transition-all duration-200"
				:class="[isProcessing ? 'text-white/90 hover:bg-white/10' : 'text-white/40 cursor-not-allowed']"
				:disabled="!isProcessing"
				@click="emit('pause')">
				<UIcon
					name="i-lucide-pause"
					class="size-4" />
				暂停
			</button>
			<button
				class="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-medium transition-all duration-200"
				:class="[
					isProcessing || taskCount > 0 ? 'text-white/90 hover:bg-white/10' : 'text-white/40 cursor-not-allowed',
				]"
				:disabled="!isProcessing && taskCount === 0"
				@click="emit('cancel')">
				<UIcon
					name="i-lucide-x"
					class="size-4" />
				取消
			</button>
			<button
				class="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-medium transition-all duration-200"
				:class="[taskCount > 0 ? 'text-white/90 hover:bg-white/10' : 'text-white/40 cursor-not-allowed']"
				:disabled="taskCount === 0"
				@click="emit('clear')">
				<UIcon
					name="i-lucide-trash-2"
					class="size-4" />
				清空
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue'

	const props = defineProps<{
		isProcessing: boolean
		taskCount: number
		pendingCount: number
	}>()

	const emit = defineEmits<{
		(e: 'start'): void
		(e: 'pause'): void
		(e: 'cancel'): void
		(e: 'clear'): void
	}>()

	const canStart = computed(() => props.pendingCount > 0 && !props.isProcessing)

	const buttonText = computed(() => {
		if (props.isProcessing) return '处理中...'
		if (props.pendingCount === 0) return '添加图片开始'
		return `开始压缩 (${props.pendingCount})`
	})
</script>
