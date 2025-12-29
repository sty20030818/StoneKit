import { computed } from 'vue'

import type { ToolItem } from '../../../shared/types/tool'

export function useToolPicker(allTools: () => ToolItem[], isFavorite: (id: string) => boolean) {
	const pickableTools = computed(() => {
		return allTools().filter((tool) => !isFavorite(tool.id))
	})

	const favoriteCount = computed(() => allTools().length - pickableTools.value.length)

	return {
		pickableTools,
		favoriteCount,
	}
}
