<template>
	<section>
		<div class="flex items-center justify-between mb-6 px-2">
			<h3 class="text-xl font-bold text-slate-700 flex items-center gap-2">
				<UIcon
					name="i-lucide-layout-grid"
					class="size-5 text-teal-500" />
				常用工具
			</h3>
			<button
				class="text-sm text-teal-600 font-bold hover:bg-teal-50 px-3 py-1.5 rounded-full transition-colors active:scale-95"
				@click="$router.push('/tools')">
				查看全部
			</button>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			<template v-if="isLoading">
				<ToolCardSkeleton
					v-for="index in skeletonCount"
					:key="index" />
			</template>
			<template v-else>
				<ToolCard
					v-for="tool in tools"
					:key="tool.id"
					:tool="tool" />

				<ToolCard
					empty
					@click="$emit('open-picker')" />
			</template>
		</div>

		<EmptyState
			v-if="!isLoading && !tools.length"
			icon="i-lucide-folder-heart"
			title="还没有常用工具"
			description="先去逛逛所有工具，把顺手的加入收藏吧～"
			size="md" />
	</section>
</template>

<script setup lang="ts">
	import { computed } from 'vue'

	import type { ToolItem } from '../../../shared/types/tool'
	import EmptyState from '../../../shared/components/EmptyState.vue'
	import ToolCard from '../../../components/ToolCard.vue'
	import ToolCardSkeleton from '../../../shared/components/ToolCardSkeleton.vue'

	interface Props {
		tools: ToolItem[]
		isLoading?: boolean
	}

	const props = withDefaults(defineProps<Props>(), {
		isLoading: false,
	})

	defineEmits<{
		(event: 'open-picker'): void
	}>()

	const skeletonCount = 4

	const tools = computed(() => props.tools)
	const isLoading = computed(() => props.isLoading)

	defineOptions({
		name: 'DashboardToolGrid',
	})
</script>
