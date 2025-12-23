<script setup lang="ts">
	import { computed, nextTick, ref } from 'vue'
	import { useToast } from '@nuxt/ui/composables'
	import { useSvgBase64 } from '../composables/useSvgBase64'

	const svgInput = ref('')
	const base64 = ref('')
	const dataUrl = ref('')
	const error = ref('')
	const loading = ref(false)
	const resultAnchorRef = ref<HTMLElement | null>(null)
	const errorRef = ref<HTMLElement | null>(null)
	const toast = useToast()

	const { toBase64, toDataUrl } = useSvgBase64()

	const canConvert = computed(() => svgInput.value.trim().length > 0)
	const canCopyB64 = computed(() => base64.value.length > 0)
	const canCopyUrl = computed(() => dataUrl.value.length > 0)

	async function convert() {
		error.value = ''
		loading.value = true
		try {
			base64.value = await toBase64(svgInput.value)
			dataUrl.value = await toDataUrl(svgInput.value)
		} catch (e: unknown) {
			base64.value = ''
			dataUrl.value = ''
			error.value = e instanceof Error ? e.message : String(e)
		} finally {
			loading.value = false
		}

		await nextTick()
		if (error.value) {
			errorRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
			return
		}
		if (base64.value || dataUrl.value) {
			resultAnchorRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}

	async function copy(text: string, label: string) {
		try {
			await navigator.clipboard.writeText(text)
			toast.add({
				title: '已复制到剪贴板',
				description: label,
				color: 'success',
			})
		} catch (e: unknown) {
			toast.add({
				title: '复制失败',
				description: e instanceof Error ? e.message : String(e),
				color: 'error',
			})
		}
	}

	function clearAll() {
		svgInput.value = ''
		base64.value = ''
		dataUrl.value = ''
		error.value = ''
	}
</script>

<template>
	<div class="min-h-screen p-6">
		<div class="mx-auto max-w-5xl space-y-4">
			<div class="flex items-end justify-between gap-3">
				<div>
					<h1 class="text-2xl font-semibold">SVG → Base64</h1>
					<p class="text-sm text-neutral-500">粘贴 SVG 文本，生成 Base64 或 Data URL</p>
				</div>
				<div class="flex gap-2">
					<UButton
						:loading="loading"
						:disabled="!canConvert"
						@click="convert"
					>
						转换
					</UButton>
					<UButton
						color="neutral"
						variant="outline"
						@click="clearAll"
					>
						清空
					</UButton>
				</div>
			</div>

			<UCard>
				<template #header>
					<div class="text-sm font-medium">SVG 输入</div>
				</template>

				<UTextarea
					v-model="svgInput"
					:rows="10"
					autoresize
					placeholder="粘贴你的 <svg>...</svg>"
					class="w-full"
					:ui="{ root: 'w-full', base: 'w-full' }"
				/>

				<template #footer>
					<div class="text-xs text-neutral-500">
						MVP 仅做基础校验：包含 &lt;svg&gt; 与 &lt;/svg&gt;。
					</div>
				</template>
			</UCard>

			<div
				v-if="error"
				ref="errorRef"
				class="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800"
			>
				<div class="font-medium">转换失败</div>
				<div class="mt-1 whitespace-pre-wrap">{{ error }}</div>
			</div>

			<div ref="resultAnchorRef" />

			<div class="grid gap-4 md:grid-cols-2">
				<UCard>
					<template #header>
						<div class="flex items-center justify-between">
							<div class="text-sm font-medium">Base64（纯字符串）</div>
							<UButton
								size="sm"
								color="neutral"
								variant="outline"
								:disabled="!canCopyB64"
								@click="copy(base64, 'Base64（纯字符串）')"
							>
								复制
							</UButton>
						</div>
					</template>
					<UTextarea
						v-model="base64"
						:rows="10"
						readonly
						class="w-full"
						:ui="{ root: 'w-full', base: 'w-full' }"
					/>
				</UCard>

				<UCard>
					<template #header>
						<div class="flex items-center justify-between">
							<div class="text-sm font-medium">Data URL</div>
							<UButton
								size="sm"
								color="neutral"
								variant="outline"
								:disabled="!canCopyUrl"
								@click="copy(dataUrl, 'Data URL')"
							>
								复制
							</UButton>
						</div>
					</template>
					<UTextarea
						v-model="dataUrl"
						:rows="10"
						readonly
						class="w-full"
						:ui="{ root: 'w-full', base: 'w-full' }"
					/>
				</UCard>
			</div>

			<UCard v-if="dataUrl">
				<template #header>
					<div class="text-sm font-medium">预览</div>
				</template>
				<div class="rounded-md border p-4">
					<img
						:src="dataUrl"
						alt="svg preview"
						class="max-h-64"
					/>
				</div>
			</UCard>
		</div>
	</div>
</template>
