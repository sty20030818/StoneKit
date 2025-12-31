<template>
	<UCard
		:ui="{
			root: 'bg-white rounded-3xl border border-slate-100/80 shadow-sm h-full flex flex-col divide-y-0',
			body: 'flex-1 flex flex-col min-h-0 p-6',
		}">
		<!-- 胶囊选择器 -->
		<div class="mb-6 flex gap-2">
			<UButton
				:variant="mode === 'paste' ? 'solid' : 'ghost'"
				:color="mode === 'paste' ? 'primary' : 'gray'"
				size="sm"
				:ui="{
					base: 'rounded-full px-4 py-2 text-sm font-medium transition-all',
				}"
				@click="setMode('paste')">
				粘贴代码
			</UButton>
			<UButton
				:variant="mode === 'upload' ? 'solid' : 'ghost'"
				:color="mode === 'upload' ? 'primary' : 'gray'"
				size="sm"
				:ui="{
					base: 'rounded-full px-4 py-2 text-sm font-medium transition-all',
				}"
				@click="setMode('upload')">
				上传文件
			</UButton>
		</div>

		<!-- 粘贴代码模式 -->
		<div
			v-if="mode === 'paste'"
			class="flex-1 flex flex-col min-h-0">
			<UTextarea
				:model-value="modelValue"
				placeholder="粘贴 SVG 代码…"
				autoresize
				:rows="20"
				:ui="{
					root: 'flex-1 min-h-0',
					base: 'font-mono text-sm resize-none h-full',
					wrapper: 'h-full',
				}"
				@update:model-value="handleInput" />
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
	import { ref, watch } from 'vue'
	import { useSvgInputMode } from '../composables/useSvgInputMode'
	import { useSvgFileUpload } from '../composables/useSvgFileUpload'

	type Props = {
		modelValue: string
	}

	type Emits = {
		(e: 'update:modelValue', value: string): void
	}

	const props = defineProps<Props>()
	const emit = defineEmits<Emits>()

	const { mode, setMode } = useSvgInputMode()
	const files = ref<File[]>([])

	const handleInput = (value: string) => {
		emit('update:modelValue', value)
	}

	const handleFileRead = (content: string) => {
		emit('update:modelValue', content)
		// 读取后切换到粘贴模式以便查看内容
		setMode('paste')
	}

	const { handleFileSelect } = useSvgFileUpload(handleFileRead)

	watch(files, (newFiles) => {
		if (newFiles.length > 0) {
			void handleFileSelect(newFiles[0])
			files.value = []
		}
	})
</script>
