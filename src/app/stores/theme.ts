import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { ThemeKey } from '../../shared/theme/themes'
import { THEMES } from '../../shared/theme/themes'

export const useThemeStore = defineStore(
	'theme',
	() => {
		const activeTheme = ref<ThemeKey>('lavender')
		const theme = computed(() => THEMES[activeTheme.value])

		function setTheme(key: ThemeKey) {
			activeTheme.value = key
		}

		return { activeTheme, theme, setTheme, THEMES }
	},
	{
		persist: true,
	},
)
