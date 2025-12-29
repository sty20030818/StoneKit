import type { ToolItem } from '../shared/types/tool'

export const TOOL_REGISTRY: ToolItem[] = [
	{
		id: 'svg-base64',
		name: 'SVG 转 Base64',
		description: '拖拽或粘贴 SVG，生成可直接用于代码的 Data URL。',
		icon: 'i-lucide-file-code',
		to: '/svg-converter',
		category: '开发工具',
		featured: true,
		hot: true,
	},
	{
		id: 'json-format',
		name: 'JSON 格式化',
		description: '美化、压缩与验证 JSON 数据，支持智能错误高亮。',
		icon: 'i-lucide-file-json',
		to: '/json-format',
		category: '开发工具',
		hot: true,
	},
	{
		id: 'base64-encoder',
		name: 'Base64 编码器',
		description: '安全地将文本或文件编码/解码为 Base64 格式。',
		icon: 'i-lucide-cpu',
		to: '/base64-encoder',
		category: '开发工具',
		hot: true,
	},
	{
		id: 'regex-tester',
		name: '正则测试',
		description: '通过实时匹配结果测试和调试正则表达式。',
		icon: 'i-lucide-zap',
		to: '/regex-tester',
		category: '开发工具',
		hot: true,
	},
	{
		id: 'image-compress',
		name: '图片压缩',
		description: '无损压缩 PNG/JPG 图片，优化文件大小。',
		icon: 'i-lucide-image',
		to: '/image-compress',
		category: '媒体',
		hot: true,
	},
	{
		id: 'css-generator',
		name: 'CSS 生成器',
		description: '生成渐变、阴影等 CSS 代码，快速构建样式。',
		icon: 'i-lucide-palette',
		to: '/css-generator',
		category: '设计',
		hot: true,
	},
	{
		id: 'color-extract',
		name: '色彩提取',
		description: '提取图片配色方案，生成调色板。',
		icon: 'i-lucide-sparkles',
		to: '/color-extract',
		category: '设计',
		hot: true,
	},
	{
		id: 'md5-hash',
		name: 'MD5 加密',
		description: '哈希算法在线生成，快速计算文件或文本的 MD5 值。',
		icon: 'i-lucide-fingerprint',
		to: '/md5-hash',
		category: '安全',
		hot: true,
	},
]

export function getTools() {
	return TOOL_REGISTRY
}

export function getHotTools(favoriteIdSet?: ReadonlySet<string>) {
	if (!favoriteIdSet) return TOOL_REGISTRY.filter((t) => t.hot)
	return TOOL_REGISTRY.filter((t) => favoriteIdSet.has(t.id))
}

export function getFeaturedTool() {
	return TOOL_REGISTRY.find((t) => t.featured) ?? TOOL_REGISTRY[0]
}

export function getToolById(id: string) {
	return TOOL_REGISTRY.find((t) => t.id === id)
}
