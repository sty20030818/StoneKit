import { ref } from 'vue'

export type InputMode = 'paste' | 'upload'

export function useSvgInputMode() {
	const mode = ref<InputMode>('paste')

	const setMode = (newMode: InputMode) => {
		mode.value = newMode
	}

	return {
		mode,
		setMode,
	}
}
