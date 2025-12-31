import { invoke } from '@tauri-apps/api/core'

export async function validateSvg(svg: string): Promise<boolean> {
	try {
		await invoke<string>('svg_to_base64', { svg: svg.trim() })
		return true
	} catch {
		return false
	}
}
