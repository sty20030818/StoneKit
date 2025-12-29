import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useToolFavoritesStore = defineStore(
	'toolFavorites',
	() => {
		const favoriteIds = ref<string[]>([])

		const favoriteIdSet = computed(() => new Set(favoriteIds.value))

		function isFavorite(id: string) {
			return favoriteIdSet.value.has(id)
		}

		function toggleFavorite(id: string) {
			if (isFavorite(id)) {
				favoriteIds.value = favoriteIds.value.filter((x) => x !== id)
				return
			}
			favoriteIds.value = [...favoriteIds.value, id]
		}

		return {
			favoriteIds,
			favoriteIdSet,
			isFavorite,
			toggleFavorite,
		}
	},
	{
		persist: {
			key: 'stonekit.toolFavorites',
		},
	},
)
