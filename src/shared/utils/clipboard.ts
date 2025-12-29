export async function copyTextToClipboard(text: string) {
	if (!text) return

	await navigator.clipboard.writeText(text)
}
