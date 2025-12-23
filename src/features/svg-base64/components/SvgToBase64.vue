<template>
	<div class="max-w-5xl mx-auto h-[85vh] flex flex-col animate-in-zoom">
		<!-- 顶部控制栏 -->
		<div class="flex items-center gap-4 mb-6">
			<UButton
				color="neutral"
				variant="outline"
				class="p-3 rounded-full bg-white/50 hover:bg-white border border-white/60 shadow-sm transition-all hover:scale-105 active:scale-95"
				@click="router.push('/')">
				<UIcon
					name="i-lucide-arrow-left"
					class="size-5" />
			</UButton>
			<h2 :class="['text-2xl font-bold', theme.primaryText]">SVG 编码工厂</h2>
		</div>

		<!-- 工作区 -->
		<div class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
			<!-- 左侧：输入区 -->
			<div
				:class="[
					'relative rounded-[32px] p-1 bg-linear-to-br from-white/80 to-white/40 border border-white/60 shadow-lg flex flex-col transition-all duration-300',
					isDragging ? 'ring-4 ring-offset-2 ' + theme.ring : '',
				]"
				@dragover.prevent="isDragging = true"
				@dragleave="isDragging = false"
				@drop.prevent="handleDrop">
				<div class="absolute top-4 right-4 z-10 flex gap-2">
					<UButton
						v-if="svgInput"
						color="error"
						variant="soft"
						size="xs"
						class="px-3 py-1.5 rounded-full font-bold"
						@click="clearAll">
						清空
					</UButton>
					<UButton
						color="neutral"
						variant="soft"
						size="xs"
						class="px-4 py-1.5 rounded-full font-bold flex items-center gap-1"
						@click="triggerFileUpload">
						<UIcon
							name="i-lucide-upload"
							class="size-3" />
						上传文件
					</UButton>
					<input
						ref="fileInput"
						type="file"
						class="hidden"
						accept=".svg"
						@change="handleFileUpload" />
				</div>

				<textarea
					v-model="svgInput"
					class="w-full h-full bg-transparent p-6 rounded-[28px] resize-none outline-none text-sm font-mono text-gray-700 placeholder-gray-400 focus:bg-white/50 transition-colors no-scrollbar"
					:placeholder="isDragging ? '松手即可导入...' : '粘贴 SVG 代码，或者把文件拖进来...'" />
			</div>

			<!-- 右侧：预览与输出 -->
			<div class="flex flex-col gap-6">
				<!-- 预览卡片 -->
				<div
					class="flex-1 rounded-[32px] bg-white/70 backdrop-blur-xl border border-white/60 shadow-lg relative overflow-hidden flex flex-col">
					<div class="p-4 border-b border-gray-100/50 flex justify-between items-center bg-white/30">
						<span :class="['text-xs font-bold uppercase tracking-wider', theme.accentText]">Live Preview</span>
						<div class="flex gap-1">
							<div class="w-3 h-3 rounded-full bg-gray-300" />
							<div class="w-3 h-3 rounded-full bg-white border border-gray-200" />
							<div class="w-3 h-3 rounded-full bg-gray-800" />
						</div>
					</div>

					<div
						class="flex-1 flex items-center justify-center p-8 relative bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-size-[24px_24px]">
						<Transition
							name="preview"
							mode="out-in">
							<img
								v-if="dataUrl"
								:key="dataUrl"
								:src="dataUrl"
								alt="Preview"
								class="max-h-48 max-w-full drop-shadow-2xl" />
							<div
								v-else
								key="empty"
								class="text-center opacity-30">
								<UIcon
									name="i-lucide-maximize-2"
									class="size-12 mx-auto mb-2" />
								<p>等待输入...</p>
							</div>
						</Transition>
					</div>
				</div>

				<!-- 错误提示 -->
				<div
					v-if="error"
					class="rounded-[24px] border border-red-200 bg-red-50/80 backdrop-blur p-4 text-sm text-red-800">
					<div class="font-bold">转换失败</div>
					<div class="mt-1 whitespace-pre-wrap">{{ error }}</div>
				</div>

				<!-- 输出与复制操作 -->
				<div :class="['rounded-[32px] p-6 text-white shadow-xl relative overflow-hidden', theme.primary]">
					<div
						class="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

					<div class="relative z-10">
						<div class="flex justify-between items-end mb-4">
							<div>
								<h3 class="text-xl font-bold mb-1">准备就绪</h3>
								<p class="text-white/70 text-sm">
									{{ loading ? '生成中...' : '已生成 Data URL' }}
								</p>
							</div>
							<div class="text-right text-xs font-mono opacity-60">
								{{ dataUrl.length > 0 ? dataUrl.length + ' chars' : '0 chars' }}
							</div>
						</div>

						<div class="flex gap-3">
							<UButton
								:disabled="!dataUrl"
								:loading="loading"
								color="neutral"
								variant="solid"
								class="flex-1 py-4 rounded-2xl bg-white text-gray-900 font-bold flex items-center justify-center gap-2 hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
								@click="copyToClipboard('url')">
								<UIcon
									v-if="copyStatus === 'url'"
									name="i-lucide-check"
									class="size-4 text-green-600" />
								<UIcon
									v-else
									name="i-lucide-copy"
									class="size-4" />
								<span>复制 URL</span>
							</UButton>

							<UButton
								:disabled="!dataUrl"
								color="neutral"
								variant="solid"
								class="px-6 rounded-2xl bg-black/20 hover:bg-black/30 text-white font-bold backdrop-blur-sm transition-all active:scale-95 flex items-center justify-center"
								title="Copy CSS background-image"
								@click="copyToClipboard('css')">
								<UIcon
									v-if="copyStatus === 'css'"
									name="i-lucide-check"
									class="size-4" />
								<span v-else>CSS</span>
							</UButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, watch } from 'vue'
	import { storeToRefs } from 'pinia'
	import { useToast } from '@nuxt/ui/composables'
	import { useRouter } from 'vue-router'
	import { useSvgBase64 } from '../composables/useSvgBase64'
	import { useThemeStore } from '../../../app/stores/theme'

	const svgInput = ref('')
	const base64 = ref<string>('')
	const dataUrl = ref<string>('')
	const error = ref<string>('')
	const loading = ref<boolean>(false)
	const isDragging = ref(false)
	const copyStatus = ref<'idle' | 'url' | 'css'>('idle')
	const fileInput = ref<HTMLInputElement | null>(null)

	const router = useRouter()
	const toast = useToast()
	const themeStore = useThemeStore()
	const { theme } = storeToRefs(themeStore)

	const { toBase64, toDataUrl } = useSvgBase64()

	function clearAll() {
		svgInput.value = ''
		base64.value = ''
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
		if (!file.type.includes('svg')) return

		const reader = new FileReader()
		reader.onload = (ev) => {
			const text = ev.target?.result
			if (typeof text === 'string') svgInput.value = text
		}
		reader.readAsText(file)
	}

	async function convertNow() {
		const input = svgInput.value.trim()
		if (!input) {
			base64.value = ''
			dataUrl.value = ''
			error.value = ''
			return
		}

		error.value = ''
		loading.value = true
		try {
			base64.value = await toBase64(input)
			dataUrl.value = await toDataUrl(input)
		} catch (e: unknown) {
			base64.value = ''
			dataUrl.value = ''
			error.value = e instanceof Error ? e.message : String(e)
		} finally {
			loading.value = false
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
			await navigator.clipboard.writeText(textToCopy)
			copyStatus.value = template
			toast.add({
				title: '已复制到剪贴板',
				description: template === 'css' ? 'CSS background-image' : 'Data URL',
				color: 'success',
			})
			setTimeout(() => (copyStatus.value = 'idle'), 2000)
		} catch (e: unknown) {
			toast.add({
				title: '复制失败',
				description: e instanceof Error ? e.message : String(e),
				color: 'error',
			})
		}
	}
</script>
