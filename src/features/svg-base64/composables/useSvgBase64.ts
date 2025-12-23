import { invoke } from '@tauri-apps/api/core'

export function useSvgBase64() {
	const toBase64 = (svg: string) => invoke<string>('svg_to_base64', { svg })
	const toDataUrl = (svg: string) => invoke<string>('svg_to_data_url', { svg })

	return { toBase64, toDataUrl }
}
