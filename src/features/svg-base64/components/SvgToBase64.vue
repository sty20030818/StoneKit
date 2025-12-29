<template>
	<PageLayout>
		<template #header>
			<div class="flex items-center gap-3">
				<UButton
					variant="ghost"
					icon="i-lucide-arrow-left"
					@click="router.push('/')">
					返回
				</UButton>
				<div class="text-lg font-semibold">SVG 编码工厂</div>
			</div>
		</template>

		<div class="space-y-6">
			<div class="grid gap-6 lg:grid-cols-2">
				<!-- 输入 -->
				<div
					:class="[isDragging ? 'ring-2 rounded-lg' : '']"
					@dragover.prevent="isDragging = true"
					@dragleave="isDragging = false"
					@drop.prevent="handleDrop">
					<UCard variant="soft">
						<template #header>
							<div class="flex items-center justify-between gap-3">
								<div class="space-y-0.5">
									<div class="text-sm font-semibold">输入 SVG</div>
									<div class="text-xs">支持拖拽 .svg 文件或直接粘贴代码</div>
								</div>
								<div class="flex items-center gap-2">
									<UButton
										v-if="svgInput"
										size="xs"
										variant="soft"
										@click="clearAll">
										清空
									</UButton>
									<UButton
										size="xs"
										variant="soft"
										icon="i-lucide-upload"
										@click="triggerFileUpload">
										上传
									</UButton>
									<input
										ref="fileInput"
										type="file"
										class="hidden"
										accept=".svg"
										@change="handleFileUpload" />
								</div>
							</div>
						</template>

						<UTextarea
							v-model="svgInput"
							:placeholder="isDragging ? '松手即可导入…' : '粘贴 SVG 代码，或者把文件拖进来…'"
							autoresize
							:rows="12"
							:ui="{ base: 'font-mono' }" />
					</UCard>
				</div>

				<!-- 预览 + 输出 -->
				<div class="min-h-0 space-y-6">
					<UCard
						variant="soft"
						class="min-h-0">
						<template #header>
							<div class="flex items-center justify-between">
								<div class="text-sm font-semibold">预览</div>
								<div class="text-xs">Live</div>
							</div>
						</template>

						<div class="flex h-56 items-center justify-center rounded-lg ring-1">
							<Transition
								name="preview"
								mode="out-in">
								<img
									v-if="dataUrl"
									:key="dataUrl"
									:src="dataUrl"
									alt="Preview"
									class="max-h-48 max-w-full" />
								<div
									v-else
									key="empty"
									class="text-center text-sm">
									<UIcon
										name="i-lucide-image"
										class="mx-auto mb-2 size-6" />
									<div>等待输入…</div>
								</div>
							</Transition>
						</div>
					</UCard>

					<UAlert
						v-if="error"
						variant="soft"
						title="转换失败"
						:description="error" />

					<UCard variant="soft">
						<template #header>
							<div class="flex items-end justify-between gap-3">
								<div>
									<div class="text-sm font-semibold">输出</div>
									<div class="text-xs">
										{{ loading ? '生成中…' : dataUrl ? '已生成 Data URL' : '暂无输出' }}
									</div>
								</div>
								<div class="text-xs font-mono">
									{{ dataUrl.length ? dataUrl.length + ' chars' : '0 chars' }}
								</div>
							</div>
						</template>

						<UTextarea
							:model-value="dataUrl"
							readonly
							:rows="4"
							placeholder="输出会出现在这里…"
							:ui="{ base: 'font-mono' }" />

						<template #footer>
							<div class="flex flex-col gap-2 sm:flex-row">
								<UButton
									:disabled="!dataUrl"
									:loading="loading"
									class="sm:flex-1"
									@click="() => copyToClipboard('url')">
									<UIcon
										v-if="copyStatus === 'url'"
										:name="IconCheck"
										class="size-4" />
									<UIcon
										v-else
										:name="IconCopy"
										class="size-4" />
									复制 URL
								</UButton>

								<UButton
									:disabled="!dataUrl"
									variant="outline"
									@click="copyToClipboard('css')">
									<UIcon
										v-if="copyStatus === 'css'"
										:name="IconCheck"
										class="size-4" />
									<span v-else>复制 CSS</span>
								</UButton>
							</div>
						</template>
					</UCard>
				</div>
			</div>
		</div>
	</PageLayout>
</template>

<script setup lang="ts">
	import IconCheck from '~icons/lucide/check'
	import IconCopy from '~icons/lucide/copy'

	import { ref, watch } from 'vue'
	import { useToast } from '@nuxt/ui/composables'
	import { useRouter } from 'vue-router'
	import PageLayout from '../../../shared/components/PageLayout.vue'
	import { useSvgBase64 } from '../composables/useSvgBase64'
	import { useLoadingState } from '../../../shared/composables/useLoadingState'
	import { copyTextToClipboard } from '../../../shared/utils/clipboard'
	import { readSvgFile } from '../../../shared/utils/file'

	const svgInput = ref('')
	const dataUrl = ref<string>('')
	const error = ref<string>('')
	const isDragging = ref(false)
	const copyStatus = ref<'idle' | 'url' | 'css'>('idle')
	const fileInput = ref<HTMLInputElement | null>(null)

	const router = useRouter()
	const toast = useToast()
	const { isLoading: loading, run: runWithLoading } = useLoadingState()

	const { toDataUrl } = useSvgBase64()

	function clearAll() {
		svgInput.value = ''
		dataUrl.value = ''
		error.value = ''
	}

	function triggerFileUpload() {
		fileInput.value?.click()
	}

	function handleFileUpload(e: Event) {
		const input = e.target as HTMLInputElement
		const file = input.files?.[0]
		void processFile(file)
	}

	function handleDrop(e: DragEvent) {
		isDragging.value = false
		const file = e.dataTransfer?.files?.[0]
		void processFile(file)
	}

	async function processFile(file?: File) {
		if (!file) return
		try {
			const text = await readSvgFile(file)
			svgInput.value = text
		} catch (e: unknown) {
			toast.add({
				title: '文件读取失败',
				description: e instanceof Error ? e.message : String(e),
				color: 'red',
			})
		}
	}

	async function convertNow() {
		const input = svgInput.value.trim()
		if (!input) {
			dataUrl.value = ''
			error.value = ''
			return
		}

		error.value = ''
		try {
			dataUrl.value = await runWithLoading(() => toDataUrl(input))
		} catch (e: unknown) {
			dataUrl.value = ''
			error.value = e instanceof Error ? e.message : String(e)
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

	async function copyToClipboard(template: 'url' | 'css') {
		if (!dataUrl.value) return

		const textToCopy = template === 'css' ? `background-image: url("${dataUrl.value}");` : dataUrl.value

		try {
			await copyTextToClipboard(textToCopy)
			copyStatus.value = template
			toast.add({
				title: '已复制到剪贴板',
				description: template === 'css' ? 'CSS background-image' : 'Data URL',
				color: 'green',
			})
			setTimeout(() => (copyStatus.value = 'idle'), 2000)
		} catch (e: unknown) {
			toast.add({
				title: '复制失败',
				description: e instanceof Error ? e.message : String(e),
				color: 'red',
			})
		}
	}
</script>
