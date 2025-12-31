import { ref } from 'vue'
import { useToast } from '@nuxt/ui/composables'
import { copyTextToClipboard } from '@/shared/utils/clipboard'

export type CopyFormat = 'url' | 'css'

export function useBase64Copy() {
	const copyStatus = ref<CopyFormat | 'idle'>('idle')
	const toast = useToast()

	const copy = async (dataUrl: string, format: CopyFormat) => {
		if (!dataUrl) return

		const textToCopy = format === 'css' ? `background-image: url("${dataUrl}");` : dataUrl

		try {
			await copyTextToClipboard(textToCopy)
			copyStatus.value = format
			toast.add({
				title: '已复制到剪贴板',
				description: format === 'css' ? 'CSS background-image' : 'Data URL',
				color: 'green',
			})
			setTimeout(() => {
				copyStatus.value = 'idle'
			}, 2000)
		} catch (error: unknown) {
			toast.add({
				title: '复制失败',
				description: error instanceof Error ? error.message : String(error),
				color: 'red',
			})
		}
	}

	return {
		copyStatus,
		copy,
	}
}
