<template>
	<UCard
		:ui="{
			root: 'bg-white rounded-3xl border border-slate-100/80 shadow-sm h-full flex flex-col divide-y-0',
			header: 'px-6 py-4 border-b border-slate-100 shrink-0',
			body: 'flex-1 flex flex-col min-h-0 p-6',
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
			class="flex-1 flex flex-col min-h-0 relative">
			<UTextarea
				:model-value="modelValue"
				placeholder="<!-- 请在此处粘贴您的 SVG 代码 -->"
				autoresize
				:rows="20"
				:ui="{
					root: 'flex-1 min-h-0 rounded-none border-0',
					base: 'font-mono text-sm leading-loose resize-none h-full border-0 rounded-none bg-transparent px-0 py-0 focus:ring-0 focus:outline-none focus:border-0 hover:ring-0 hover:border-0 active:ring-0 active:border-0 placeholder:text-slate-300',
					wrapper: 'h-full rounded-none border-0',
				}"
				@update:model-value="handleInput" />

			<!-- 底部状态栏 -->
			<div
				class="absolute bottom-0 left-0 right-0 h-9 bg-white border-t border-slate-50 flex items-center justify-between px-6 text-xs font-mono text-slate-400 select-none">
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
				class="flex-1 min-h-0">
				<template #default="{ isDragging, open }">
					<div
						:class="[
							'flex flex-col items-center justify-center h-full min-h-[400px] rounded-2xl border-2 border-dashed transition-all cursor-pointer',
							isDragging
								? 'border-teal-400 bg-teal-50/50 shadow-lg shadow-teal-500/10'
								: 'border-slate-200 hover:border-teal-300 hover:bg-slate-50/50',
						]"
						@click="open()">
						<div
							:class="[
								'mb-4 size-16 rounded-2xl flex items-center justify-center transition-all',
								isDragging
									? 'bg-teal-100 text-teal-600 scale-110'
									: 'bg-slate-100 text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-500',
							]">
							<UIcon
								name="i-lucide-upload"
								class="size-8" />
						</div>
						<p
							:class="[
								'mb-2 text-base font-semibold transition-colors',
								isDragging ? 'text-teal-700' : 'text-slate-700',
							]">
							{{ isDragging ? '松手即可上传' : '点击或拖拽文件到此处上传' }}
						</p>
						<p class="text-sm text-slate-500">支持 SVG 文件</p>
					</div>
				</template>
			</UFileUpload>
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

	const files = ref<File[]>([])

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

	watch(files, (newFiles) => {
		if (newFiles.length > 0) {
			void handleFileSelect(newFiles[0])
			files.value = []
		}
	})
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
