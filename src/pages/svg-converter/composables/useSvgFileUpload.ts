import { ref } from 'vue'
import { useToast } from '@nuxt/ui/composables'
import { readSvgFile } from '@/shared/utils/file'

export function useSvgFileUpload(onFileRead: (content: string) => void) {
	const isDragging = ref(false)
	const toast = useToast()

	const handleFileSelect = async (file: File | null): Promise<void> => {
		if (!file) return

		try {
			const content = await readSvgFile(file)
			onFileRead(content)
		} catch (error: unknown) {
			toast.add({
				title: '文件读取失败',
				description: error instanceof Error ? error.message : String(error),
				color: 'red',
			})
			throw error
		}
	}

	return {
		isDragging,
		handleFileSelect,
	}
}
