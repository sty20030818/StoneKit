import { computed, inject, ref } from 'vue'
import { useRouter } from 'vue-router'

import { getHotTools, getTools } from '../../../tools/registry'
import { useToolFavoritesStore } from '../../../stores/toolFavorites'
import { formatHeroNow } from '../../../shared/utils/date'

export function useDashboard() {
	const favoritesStore = useToolFavoritesStore()
	const router = useRouter()
	const dashboardSearchOpen = inject<{ value: boolean } | null>('dashboardSearchOpen', null)

	const heroNow = formatHeroNow()
	const isPickerOpen = ref(false)

	const hotTools = computed(() => getHotTools(favoritesStore.favoriteIdSet))
	const allTools = computed(() => getTools())

	const heroStats = computed(() => ({
		tools: getHotTools().length,
	}))

	function goAllTools() {
		router.push('/tools')
	}

	function openSearch() {
		if (dashboardSearchOpen) dashboardSearchOpen.value = true
	}

	function openAddToolPicker() {
		isPickerOpen.value = true
	}

	function closeToolPicker() {
		isPickerOpen.value = false
	}

	function addFavorite(id: string) {
		if (!favoritesStore.isFavorite(id)) favoritesStore.toggleFavorite(id)
		closeToolPicker()
	}

	const pickableTools = computed(() => {
		return allTools.value.filter((tool) => !favoritesStore.isFavorite(tool.id))
	})

	return {
		heroNow,
		heroStats,
		hotTools,
		allTools,
		isPickerOpen,
		pickableTools,
		goAllTools,
		openSearch,
		openAddToolPicker,
		closeToolPicker,
		addFavorite,
		favoritesStore,
	}
}
