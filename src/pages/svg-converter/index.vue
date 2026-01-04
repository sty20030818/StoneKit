<template>
	<ToolPageLayout>
		<div class="grid gap-[clamp(1rem,2vw,1.5rem)] lg:grid-cols-2 h-full">
			<!-- 左侧：输入区域 -->
			<div class="flex flex-col gap-[clamp(0.75rem,1.5vw,1rem)] min-h-0 h-full">
				<InputModeToggle v-model="inputMode" />
				<SvgInputCard
					v-model="svgInput"
					:mode="inputMode" />
			</div>

			<!-- 右侧：预览 + 输出 -->
			<div class="flex flex-col gap-[clamp(0.75rem,1.5vw,1rem)] min-h-0 h-full">
				<SvgPreview
					:svg-input="svgInput"
					:data-url="dataUrl"
					class="flex-2" />

				<Base64Output
					:data-url="dataUrl"
					:loading="loading"
					class="flex-1" />
			</div>
		</div>
	</ToolPageLayout>
</template>

<script setup lang="ts">
	import { ref, watch } from 'vue'
	import ToolPageLayout from '@/shared/components/ToolPageLayout.vue'
	import InputModeToggle from './components/InputModeToggle.vue'
	import SvgInputCard from './components/SvgInputCard.vue'
	import SvgPreview from './components/SvgPreview.vue'
	import Base64Output from './components/Base64Output.vue'
	import { useSvgBase64 } from './composables/useSvgBase64'
	import { useLoadingState } from '@/shared/composables/useLoadingState'
	import type { InputMode } from './components/InputModeToggle.vue'

	const svgInput = ref('')
	const dataUrl = ref<string>('')
	const inputMode = ref<InputMode>('paste')
	const { isLoading: loading, run: runWithLoading } = useLoadingState()
	const { toDataUrl } = useSvgBase64()

	async function convertNow() {
		const input = svgInput.value.trim()
		if (!input) {
			dataUrl.value = ''
			return
		}

		try {
			dataUrl.value = await runWithLoading(() => toDataUrl(input))
		} catch {
			dataUrl.value = ''
		}
	}

	let debounceTimer: ReturnType<typeof setTimeout> | undefined
	watch(
		svgInput,
		() => {
			clearTimeout(debounceTimer)
			debounceTimer = setTimeout(() => void convertNow(), 250)
		},
		{ flush: 'post' },
	)
</script>
