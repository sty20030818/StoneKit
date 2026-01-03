<template>
	<UCard
		:ui="{
			root: 'bg-white rounded-3xl border border-slate-100/80 shadow-sm h-full flex flex-col divide-y-0',
			header: 'px-6 py-4 border-b border-slate-100 shrink-0',
			body: 'p-6 flex-1 min-h-0',
		}">
		<template #header>
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<div class="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center">
						<UIcon
							name="i-lucide-eye"
							class="size-4 text-teal-600" />
					</div>
					<div class="text-sm font-semibold text-slate-700">实时预览</div>
				</div>
				<div
					v-if="dimensions"
					class="px-3 py-1 rounded-full bg-slate-50 text-xs font-mono text-slate-600">
					{{ dimensions }}
				</div>
			</div>
		</template>

		<div class="flex h-full items-center justify-center rounded-2xl ring-1 ring-slate-200 checkerboard-bg">
			<Transition
				name="preview"
				mode="out-in">
				<img
					v-if="dataUrl"
					:key="dataUrl"
					:src="dataUrl"
					alt="SVG 预览"
					class="w-60 h-60 object-contain transition-transform duration-300 hover:scale-105 relative z-10" />
				<div
					v-else
					key="empty"
					class="text-center">
					<div class="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
						<UIcon
							name="i-lucide-file-image"
							class="size-8 text-slate-400" />
					</div>
					<span class="text-sm text-slate-500 font-medium">等待输入…</span>
				</div>
			</Transition>
		</div>
	</UCard>
</template>

<script setup lang="ts">
	import { computed } from 'vue'
	import { useSvgDimensions } from '../composables/useSvgDimensions'

	type Props = {
		svgInput: string
		dataUrl: string
	}

	const props = defineProps<Props>()

	const { parseDimensions, formatDimensions } = useSvgDimensions()

	const dimensions = computed(() => {
		if (!props.svgInput.trim()) return null
		const dims = parseDimensions(props.svgInput)
		return formatDimensions(dims)
	})
</script>

<style scoped>
	/* 棋盘格背景 - CSS 渐变 */
	.checkerboard-bg {
		background-color: #ffffff;
		background-image:
			linear-gradient(45deg, #f1f5f9 25%, transparent 25%), linear-gradient(-45deg, #f1f5f9 25%, transparent 25%),
			linear-gradient(45deg, transparent 75%, #f1f5f9 75%), linear-gradient(-45deg, transparent 75%, #f1f5f9 75%);
		background-size: 16px 16px;
		background-position:
			0 0,
			0 8px,
			8px -8px,
			-8px 0px;
	}

	.preview-enter-active,
	.preview-leave-active {
		transition: opacity 0.3s ease;
	}

	.preview-enter-from,
	.preview-leave-to {
		opacity: 0;
	}
</style>
