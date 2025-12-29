<template>
	<PageLayout>
		<template #header>
			<div class="flex items-start justify-between gap-6">
				<div>
					<h1 class="text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">所有工具</h1>
					<p class="mt-2 font-medium text-slate-500">按分类浏览全部工具，点击即可打开。</p>
				</div>

				<div class="shrink-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
					<div class="text-xs font-bold uppercase tracking-widest text-slate-400">总数</div>
					<div class="mt-1 text-2xl font-extrabold text-slate-900">{{ tools.length }}</div>
				</div>
			</div>
		</template>

		<section
			v-if="toolGroups.length"
			class="space-y-8 pb-6">
			<div
				v-for="group in toolGroups"
				:key="group.id"
				class="space-y-4">
				<div class="flex items-center justify-between px-2">
					<div class="flex items-center gap-2">
						<span class="h-2 w-2 rounded-full bg-teal-500" />
						<h2 class="text-lg font-extrabold text-slate-800">{{ group.label }}</h2>
					</div>
					<span class="text-xs font-bold text-slate-400">{{ group.items.length }} 个</span>
				</div>

				<div class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					<ToolCard
						v-for="tool in group.items"
						:key="tool.id"
						:tool="tool" />
				</div>
			</div>
		</section>

		<EmptyState
			v-else
			icon="i-lucide-search-x"
			title="没有可用工具"
			description="当前还没有注册任何工具，稍后再来看看吧。" />
	</PageLayout>
</template>

<script setup lang="ts">
	import { computed } from 'vue'

	import PageLayout from '../shared/components/PageLayout.vue'
	import EmptyState from '../shared/components/EmptyState.vue'
	import ToolCard from '../components/ToolCard.vue'

	import { getTools } from '../tools/registry'
	import type { ToolCategory, ToolItem } from '../shared/types/tool'

	const tools = computed(() => getTools())

	const toolGroups = computed(() => {
		const map = new Map<ToolCategory, ToolItem[]>()
		for (const tool of tools.value) {
			const arr = map.get(tool.category) ?? []
			arr.push(tool)
			map.set(tool.category, arr)
		}

		return Array.from(map.entries()).map(([id, items]) => ({ id, label: id, items }))
	})
</script>
