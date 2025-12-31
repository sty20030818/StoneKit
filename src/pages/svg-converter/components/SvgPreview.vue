<template>
	<UCard
		:ui="{
			root: 'bg-white rounded-3xl border border-slate-100/80 shadow-sm flex flex-col divide-y-0',
			header: 'px-6 py-4 border-b border-slate-100',
			body: 'p-6 flex-1',
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

		<div
			class="flex h-full min-h-[300px] items-center justify-center rounded-2xl ring-1 ring-slate-200 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGgxMHYxMEgweiIgZmlsbD0iI2U1ZTdlYiIvPjxwYXRoIGQ9Ik0xMCAwaDEwdjEwSDEweiIgZmlsbD0iI2YzZjRmNiIvPjxwYXRoIGQ9Ik0wIDEwaDEwdjEwSDB6IiBmaWxsPSIjZjNmNGY2Ii8+PHBhdGggZD0iTTEwIDEwaDEwdjEwSDEweiIgZmlsbD0iI2U1ZTdlYiIvPjwvc3ZnPg==')] bg-size-[20px_20px]">
			<Transition
				name="preview"
				mode="out-in">
				<img
					v-if="dataUrl"
					:key="dataUrl"
					:src="dataUrl"
					alt="SVG 预览"
					class="max-h-full max-w-full object-contain" />
				<div
					v-else
					key="empty"
					class="text-center">
					<div class="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
						<UIcon
							name="i-lucide-image"
							class="size-8 text-slate-400" />
					</div>
					<p class="text-sm text-slate-500 font-medium">等待输入…</p>
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
	.preview-enter-active,
	.preview-leave-active {
		transition: opacity 0.3s ease;
	}

	.preview-enter-from,
	.preview-leave-to {
		opacity: 0;
	}
</style>
