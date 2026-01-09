import { ref, computed } from 'vue'
import type { Preset, PresetId, CompressOptions } from '../types'

/**
 * 预设配置
 */
const presets: Preset[] = [
	{
		id: 'material',
		label: '素材默认',
		description: 'WebP 无损，适合图标/UI 素材',
		icon: 'i-lucide-sparkles',
		format: 'webp',
		quality: 100,
		lossless: true,
		quantize: false,
	},
	{
		id: 'texture',
		label: '纹理更小',
		description: 'WebP 有损，适合背景/贴图',
		icon: 'i-lucide-image',
		format: 'webp-lossy',
		quality: 80,
		lossless: false,
		quantize: false,
	},
	{
		id: 'keep',
		label: '保持原格式',
		description: 'JPEG 重编码 / PNG 量化优化',
		icon: 'i-lucide-file-image',
		format: 'keep',
		quality: 82,
		lossless: false,
		quantize: true,
	},
	{
		id: 'lossless',
		label: '无损保守',
		description: '仅 PNG oxipng 优化，不量化',
		icon: 'i-lucide-shield-check',
		format: 'keep',
		quality: 100,
		lossless: true,
		quantize: false,
	},
]

// 全局状态（单例模式）
const activePresetId = ref<PresetId>('material')

/**
 * 预设管理 composable（单例状态）
 */
export function usePresets() {
	const activePreset = computed(() => presets.find((p) => p.id === activePresetId.value) || presets[0])

	const selectPreset = (id: PresetId) => {
		activePresetId.value = id
	}

	/**
	 * 从预设生成压缩选项
	 */
	const getOptionsFromPreset = (preset: Preset): CompressOptions => ({
		format: preset.format,
		quality: preset.quality,
		lossless: preset.lossless,
		stripExif: true,
		preserveAlpha: true,
		pngQuantQuality: 75,
	})

	return {
		presets,
		activePresetId,
		activePreset,
		selectPreset,
		getOptionsFromPreset,
	}
}
