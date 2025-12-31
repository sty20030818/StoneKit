<template>
	<PageLayout>
		<template #header>
			<div class="flex items-start justify-between gap-6">
				<div>
					<h1 class="text-2xl font-extrabold tracking-tight md:text-3xl">
						<span class="bg-linear-to-r from-teal-600 to-emerald-600 text-transparent bg-clip-text">所有工具</span>
					</h1>
					<p class="mt-2 text-sm font-medium text-slate-500 leading-relaxed">
						按分类浏览全部工具，点击卡片即可快速使用
					</p>
				</div>

				<div
					class="shrink-0 rounded-xl border border-teal-200 bg-linear-to-br from-teal-50 to-emerald-50 px-3.5 py-2.5 shadow-sm">
					<div class="flex items-center gap-1.5 mb-0.5">
						<UIcon
							name="i-lucide-layers"
							class="size-3.5 text-teal-600" />
						<div class="text-[10px] font-bold uppercase tracking-widest text-teal-600">工具总数</div>
					</div>
					<div class="text-2xl font-extrabold text-teal-700">{{ tools.length }}</div>
				</div>
			</div>
		</template>

		<section
			v-if="toolGroups.length"
			class="mt-8 space-y-8 pb-6">
			<div
				v-for="group in toolGroups"
				:key="group.id"
				class="space-y-4">
				<div class="flex items-center justify-between px-2">
					<div class="flex items-center gap-3">
						<span
							class="h-2.5 w-2.5 rounded-full bg-linear-to-br from-teal-500 to-emerald-500 shadow-sm shadow-teal-500/30" />
						<h2 class="text-lg font-extrabold text-slate-800">{{ group.label }}</h2>
					</div>
					<span
						class="px-2.5 py-1 rounded-full text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 shadow-sm">
						{{ group.items.length }} 个
					</span>
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

	import PageLayout from '@/shared/components/PageLayout.vue'
	import EmptyState from '@/shared/components/EmptyState.vue'
	import ToolCard from '@/components/ToolCard.vue'

	import { getTools } from '@/tools/registry'
	import type { ToolCategory, ToolItem } from '@/shared/types/tool'

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
