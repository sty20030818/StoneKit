import { ref } from 'vue'
import { copyTextToClipboard } from '@/shared/utils/clipboard'

export type CopyFormat = 'url' | 'css'

export function useBase64Copy() {
	const copyStatus = ref<CopyFormat | 'idle'>('idle')

	const copy = async (dataUrl: string, format: CopyFormat) => {
		if (!dataUrl) return

		const textToCopy = format === 'css' ? `background-image: url("${dataUrl}");` : dataUrl

		try {
			await copyTextToClipboard(textToCopy)
			copyStatus.value = format
			setTimeout(() => {
				copyStatus.value = 'idle'
			}, 2000)
		} catch {
			// 静默失败，按钮状态保持不变
		}
	}

	return {
		copyStatus,
		copy,
	}
}
