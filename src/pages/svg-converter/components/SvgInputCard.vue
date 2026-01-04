<template>
	<UCard
		:ui="{
			root: 'bg-white/70 backdrop-blur-xl rounded-3xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-white/50 h-full flex flex-col divide-y-0 transition-all hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)]',
			header: 'px-6 border-b border-white/40 shrink-0',
			body: 'px-6 pb-2 flex-1 flex flex-col min-h-0',
		}">
		<template #header>
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<div class="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center">
						<UIcon
							name="i-lucide-file-code"
							class="size-4 text-teal-600" />
					</div>
					<div class="text-sm font-semibold text-slate-700">SVG 输入</div>
				</div>
				<button
					v-if="mode === 'paste' && modelValue"
					@click="handleClear"
					class="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
					title="清空内容">
					<UIcon
						name="i-lucide-trash-2"
						class="size-4" />
				</button>
			</div>
		</template>

		<!-- 粘贴代码模式 -->
		<div
			v-if="mode === 'paste'"
			class="flex-1 flex flex-col min-h-0">
			<UTextarea
				:model-value="modelValue"
				placeholder="<!-- 请在此处粘贴您的 SVG 代码 -->"
				autoresize
				:rows="20"
				:ui="{
					root: 'flex-1 min-h-0 rounded-none border-0 mb-2',
					base: 'font-mono text-sm leading-loose resize-none h-full border-0 rounded-none bg-transparent px-0 py-0 focus:ring-0 focus:outline-none focus:border-0 hover:ring-0 hover:border-0 active:ring-0 active:border-0 placeholder:text-slate-300',
					wrapper: 'h-full rounded-none border-0',
				}"
				@update:model-value="handleInput" />

			<!-- 底部状态栏 -->
			<div
				class="h-8 border-t border-white/30 flex items-center justify-between px-6 text-xs font-mono text-slate-400 select-none shrink-0">
				<span>{{ fileSize }}</span>
				<span class="text-teal-600">{{ charCount }} 字符</span>
			</div>
		</div>

		<!-- 上传文件模式 -->
		<div
			v-else
			class="flex-1 flex flex-col min-h-0">
			<UFileUpload
				v-model="files"
				accept=".svg,image/svg+xml"
				:multiple="false"
				variant="area"
				icon="i-lucide-upload"
				label="点击或拖拽文件到此处上传"
				description="支持 SVG 文件"
				:preview="true"
				:ui="{
					root: 'flex-1 min-h-0',
					base: 'min-h-[400px] rounded-2xl',
				}"
				class="flex-1 min-h-0" />
		</div>
	</UCard>
</template>

<script setup lang="ts">
	import { computed, ref, watch } from 'vue'
	import { useSvgFileUpload } from '../composables/useSvgFileUpload'
	import type { InputMode } from './InputModeToggle.vue'

	type Props = {
		modelValue: string
		mode: InputMode
	}

	type Emits = {
		(e: 'update:modelValue', value: string): void
	}

	const props = defineProps<Props>()
	const emit = defineEmits<Emits>()

	const files = ref<File | null>(null)

	const handleInput = (value: string) => {
		emit('update:modelValue', value)
	}

	const handleClear = () => {
		emit('update:modelValue', '')
	}

	const handleFileRead = (content: string) => {
		emit('update:modelValue', content)
	}

	const { handleFileSelect } = useSvgFileUpload(handleFileRead)

	const charCount = computed(() => {
		if (!props.modelValue) return 0
		return props.modelValue.length
	})

	const fileSize = computed(() => {
		if (!props.modelValue) return '0 KB'
		const size = props.modelValue.length / 1024
		return `${size.toFixed(2)} KB`
	})

	watch(
		files,
		(newFile, oldFile) => {
			// 只在文件真正变化时处理（避免从 null 到 null 的触发）
			if (newFile && newFile !== oldFile) {
				void handleFileSelect(newFile)
			}
		},
		{ immediate: false },
	)
</script>

<style scoped>
	:deep(textarea) {
		border: none !important;
		outline: none !important;
		box-shadow: none !important;
	}

	:deep(textarea:focus) {
		border: none !important;
		outline: none !important;
		box-shadow: none !important;
	}

	:deep(textarea:hover) {
		border: none !important;
		outline: none !important;
		box-shadow: none !important;
	}
</style>
