import { computed, inject, ref } from 'vue'
import { useRouter } from 'vue-router'

import { getHotTools, getTools } from '@/tools/registry'
import { useToolFavoritesStore } from '@/stores/toolFavorites'
import { formatHeroNow } from '@/shared/utils/date'

/**
 * 仪表盘组合式函数
 * 提供仪表盘页面所需的状态和方法
 * @returns 包含仪表盘相关状态和方法的对象
 */
export function useDashboard() {
	const favoritesStore = useToolFavoritesStore()
	const router = useRouter()
	// 注入搜索框的打开状态，用于跨组件通信
	const dashboardSearchOpen = inject<{ value: boolean } | null>('dashboardSearchOpen', null)

	// 当前时间问候语（如"早上好"、"下午好"等）
	const heroNow = formatHeroNow()
	// 工具选择器的打开状态
	const isPickerOpen = ref(false)

	// 热门工具列表：优先显示收藏的工具，否则显示热门工具
	const hotTools = computed(() => getHotTools(favoritesStore.favoriteIdSet))
	// 所有工具列表
	const allTools = computed(() => getTools())

	// Hero 区域的统计数据
	const heroStats = computed(() => ({
		tools: getHotTools().length,
	}))

	/**
	 * 跳转到所有工具页面
	 */
	function goAllTools() {
		router.push('/tools')
	}

	/**
	 * 打开搜索框
	 */
	function openSearch() {
		if (dashboardSearchOpen) dashboardSearchOpen.value = true
	}

	/**
	 * 打开工具选择器
	 */
	function openAddToolPicker() {
		isPickerOpen.value = true
	}

	/**
	 * 关闭工具选择器
	 */
	function closeToolPicker() {
		isPickerOpen.value = false
	}

	/**
	 * 添加工具到收藏
	 * @param id 工具的唯一标识符
	 */
	function addFavorite(id: string) {
		if (!favoritesStore.isFavorite(id)) favoritesStore.toggleFavorite(id)
		closeToolPicker()
	}

	/**
	 * 可选择的工具列表：排除已收藏的工具
	 */
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
