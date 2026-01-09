<template>
	<!-- 参数设置岛屿 -->
	<div class="bg-white/70 backdrop-blur-xl rounded-[28px] border border-white/40 shadow-lg p-5 flex flex-col min-h-0">
		<!-- 标题 -->
		<div class="flex items-center gap-2 mb-5 shrink-0">
			<div class="w-7 h-7 rounded-[8px] bg-linear-to-br from-teal-100 to-emerald-100 flex items-center justify-center">
				<UIcon
					name="i-lucide-sliders-horizontal"
					class="size-4 text-teal-600" />
			</div>
			<span class="font-semibold text-slate-700 text-sm">压缩设置</span>
		</div>

		<!-- 可滚动内容区 -->
		<div class="flex-1 overflow-y-auto space-y-5 min-h-0 pr-1">
			<!-- 预设选择 -->
			<div class="space-y-2.5">
				<label class="text-xs font-medium text-slate-500 uppercase tracking-wide">快速预设</label>
				<div class="grid grid-cols-2 gap-2">
					<button
						v-for="preset in presets"
						:key="preset.id"
						class="flex items-center justify-start gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
						:class="[
							activePresetId === preset.id
								? 'bg-teal-500 text-white shadow-md shadow-teal-500/30'
								: 'bg-slate-100 text-slate-600 hover:bg-slate-200',
						]"
						@click="selectPreset(preset.id)">
						<UIcon
							:name="preset.icon"
							class="size-4" />
						{{ preset.label }}
					</button>
				</div>
			</div>

			<!-- 输出格式 -->
			<div class="space-y-2.5">
				<label class="text-xs font-medium text-slate-500 uppercase tracking-wide">输出格式</label>
				<div class="flex bg-slate-100 rounded-xl p-1 gap-1">
					<button
						v-for="fmt in formats"
						:key="fmt.value"
						class="flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200"
						:class="[
							isFormatActive(fmt.value) ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-500 hover:text-slate-700',
						]"
						@click="updateFormat(fmt.value)">
						{{ fmt.label }}
					</button>
				</div>
			</div>

			<!-- 质量滑块 -->
			<div class="space-y-2.5">
				<div class="flex justify-between items-center">
					<label class="text-xs font-medium text-slate-500 uppercase tracking-wide">画质</label>
					<span class="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
						{{ options.quality }}%
					</span>
				</div>
				<USlider
					:model-value="[options.quality]"
					:min="10"
					:max="100"
					:step="5"
					color="teal"
					@update:model-value="(v: number[]) => updateQuality(v[0])" />
				<div class="flex justify-between text-xs text-slate-400">
					<span>体积优先</span>
					<span>画质优先</span>
				</div>
			</div>

			<!-- 尺寸限制 -->
			<div class="space-y-2.5">
				<label class="text-xs font-medium text-slate-500 uppercase tracking-wide">最大边长 (px)</label>
				<div class="flex gap-2">
					<UInput
						:model-value="options.maxSide"
						type="number"
						placeholder="不限制"
						size="sm"
						class="flex-1"
						@update:model-value="updateMaxSide" />
					<button
						class="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
						@click="updateMaxSide(2048)">
						2048
					</button>
					<button
						class="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
						@click="updateMaxSide(4096)">
						4096
					</button>
				</div>
			</div>

			<!-- 高级选项 -->
			<UAccordion
				:items="[{ label: '高级选项', icon: 'i-lucide-settings-2', slot: 'advanced' }]"
				class="mt-2">
				<template #advanced>
					<div class="space-y-3 pt-2">
						<UCheckbox
							:model-value="options.stripExif"
							label="移除元数据（更小体积）"
							@update:model-value="updateOption('stripExif', $event)" />
						<UCheckbox
							:model-value="options.preserveAlpha"
							label="保留透明通道"
							@update:model-value="updateOption('preserveAlpha', $event)" />
						<UCheckbox
							:model-value="options.lossless"
							label="WebP 无损模式"
							@update:model-value="updateOption('lossless', $event)" />

						<div class="space-y-2 pt-2">
							<div class="flex justify-between text-xs">
								<span class="text-slate-500">PNG 量化质量</span>
								<span class="font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
									{{ options.pngQuantQuality }}%
								</span>
							</div>
							<USlider
								:model-value="[options.pngQuantQuality]"
								:min="30"
								:max="100"
								:step="5"
								color="gray"
								@update:model-value="(v: number[]) => updateOption('pngQuantQuality', v[0])" />
						</div>
					</div>
				</template>
			</UAccordion>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { CompressOptions, OutputFormat, PresetId } from '../types'
	import { usePresets } from '../composables/usePresets'

	const props = defineProps<{
		options: CompressOptions
	}>()

	const emit = defineEmits<{
		(e: 'update:options', options: CompressOptions): void
	}>()

	const { presets, activePresetId, selectPreset: selectPresetInternal, getOptionsFromPreset } = usePresets()

	// 格式选项
	const formats = [
		{ value: 'webp' as OutputFormat, label: 'WebP' },
		{ value: 'keep' as OutputFormat, label: '原格式' },
		{ value: 'avif' as OutputFormat, label: 'AVIF' },
	]

	const isFormatActive = (format: OutputFormat) => {
		if (format === 'webp') {
			return props.options.format === 'webp' || props.options.format === 'webp-lossy'
		}
		return props.options.format === format
	}

	const selectPreset = (id: PresetId) => {
		selectPresetInternal(id)
		const preset = presets.find((p) => p.id === id)
		if (preset) {
			emit('update:options', getOptionsFromPreset(preset))
		}
	}

	const updateFormat = (format: OutputFormat) => {
		emit('update:options', { ...props.options, format })
	}

	const updateQuality = (quality: number) => {
		emit('update:options', { ...props.options, quality })
	}

	const updateMaxSide = (maxSide: string | number | undefined) => {
		emit('update:options', { ...props.options, maxSide: maxSide ? Number(maxSide) : undefined })
	}

	const updateOption = <K extends keyof CompressOptions>(key: K, value: CompressOptions[K]) => {
		emit('update:options', { ...props.options, [key]: value })
	}
</script>
