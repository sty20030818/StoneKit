export async function readFileAsText(file: File): Promise<string> {
	return await new Promise<string>((resolve, reject) => {
		const reader = new FileReader()

		reader.onload = (event) => {
			const result = event.target?.result
			if (typeof result === 'string') {
				resolve(result)
				return
			}
			reject(new Error('读取文件失败'))
		}

		reader.onerror = () => {
			reject(reader.error ?? new Error('读取文件失败'))
		}

		reader.readAsText(file)
	})
}

export async function readSvgFile(file: File): Promise<string> {
	// 检查文件类型（MIME type）或文件扩展名
	const isValidSvg =
		file.type.includes('svg') || file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')

	if (!isValidSvg) {
		throw new Error('只支持 SVG 文件')
	}

	return await readFileAsText(file)
}
