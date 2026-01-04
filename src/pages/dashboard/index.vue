<template>
	<PageLayout>
		<template #header>
			<DashboardHeroSection
				:hero-now="heroNow"
				:tools-count="heroStats.tools"
				@all-tools="goAllTools"
				@open-search="openSearch" />
		</template>

		<DashboardToolGrid
			:tools="hotTools"
			@open-picker="openAddToolPicker" />

		<ToolFavoritesPicker
			:open="isPickerOpen"
			:pickable-tools="pickableTools"
			:all-count="allTools.length"
			:favorite-count="favoritesStore.favoriteIds.length"
			@update:open="isPickerOpen = $event"
			@add="addFavorite" />
	</PageLayout>
</template>

<script setup lang="ts">
	import PageLayout from '@/shared/components/PageLayout.vue'
	import DashboardHeroSection from './components/HeroSection.vue'
	import DashboardToolGrid from './components/ToolGrid.vue'
	import ToolFavoritesPicker from './components/ToolPicker.vue'
	import { useDashboard } from './composables/useDashboard'

	const {
		heroNow,
		heroStats,
		hotTools,
		allTools,
		isPickerOpen,
		pickableTools,
		goAllTools,
		openSearch,
		openAddToolPicker,
		addFavorite,
		favoritesStore,
	} = useDashboard()
</script>
