<template>
	<PageLayout>
		<div class="grid gap-8 lg:grid-cols-2 h-full">
			<!-- 左侧：输入区域 -->
			<div class="flex flex-col min-h-0">
				<SvgInputCard v-model="svgInput" />
			</div>

			<!-- 右侧：预览 + 输出 -->
			<div class="flex flex-col gap-6 min-h-0">
				<SvgPreview
					:svg-input="svgInput"
					:data-url="dataUrl" />

				<Base64Output
					:data-url="dataUrl"
					:loading="loading" />
			</div>
		</div>
	</PageLayout>
</template>

<script setup lang="ts">
	import { ref, watch } from 'vue'
	import PageLayout from '@/shared/components/PageLayout.vue'
	import SvgInputCard from './components/SvgInputCard.vue'
	import SvgPreview from './components/SvgPreview.vue'
	import Base64Output from './components/Base64Output.vue'
	import { useSvgBase64 } from './composables/useSvgBase64'
	import { useLoadingState } from '@/shared/composables/useLoadingState'

	const svgInput = ref('')
	const dataUrl = ref<string>('')
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
