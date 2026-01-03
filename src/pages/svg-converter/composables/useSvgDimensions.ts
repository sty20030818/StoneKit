export type SvgDimensions = {
	width: string | null
	height: string | null
	viewBox: string | null
}

export function useSvgDimensions() {
	const parseDimensions = (svg: string): SvgDimensions => {
		const widthMatch = svg.match(/width\s*=\s*["']([^"']+)["']/i)
		const heightMatch = svg.match(/height\s*=\s*["']([^"']+)["']/i)
		const viewBoxMatch = svg.match(/viewBox\s*=\s*["']([^"']+)["']/i)

		return {
			width: widthMatch ? widthMatch[1] : null,
			height: heightMatch ? heightMatch[1] : null,
			viewBox: viewBoxMatch ? viewBoxMatch[1] : null,
		}
	}

	const formatDimensions = (dimensions: SvgDimensions): string | null => {
		if (dimensions.width && dimensions.height) {
			// 移除单位
			const width = dimensions.width.replace(/px$/, '') || dimensions.width
			const height = dimensions.height.replace(/px$/, '') || dimensions.height
			return `${width} x ${height}`
		}

		if (dimensions.viewBox) {
			// 从 viewBox 提取尺寸 (格式: "0 0 width height")
			const parts = dimensions.viewBox.trim().split(/\s+/)
			if (parts.length >= 4) {
				const width = parts[2]
				const height = parts[3]
				return `${width} x ${height}`
			}
		}

		return null
	}

	return {
		parseDimensions,
		formatDimensions,
	}
}
