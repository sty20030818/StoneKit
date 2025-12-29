<template>
	<aside class="w-[280px] flex flex-col overflow-hidden">
		<div class="flex-none p-6 pb-4">
			<div
				class="flex items-center gap-3 px-2 mb-8 cursor-pointer"
				@click="$router.push('/')">
				<UIcon name="i-lucide-box" />
				<div>
					<span class="block">StoneKit</span>
					<span class="block">Toolbox v1.0.0</span>
				</div>
			</div>

			<div class="space-y-2">
				<UnifiedNavItem
					icon="i-lucide-home"
					label="仪表盘"
					:active="isActive('/')"
					to="/" />
				<UnifiedNavItem
					icon="i-lucide-layout-grid"
					label="所有工具"
					:active="isActive('/tools')"
					to="/tools" />
			</div>
		</div>

		<div class="flex-1 overflow-y-auto px-5 py-2">
			<div
				v-for="group in toolGroups"
				:key="group.id"
				class="mb-6">
				<div
					class="flex items-center justify-between px-3 py-1 mb-2 cursor-pointer"
					@click="toggleCategory(group.id)">
					<span>{{ group.label }}</span>
					<UIcon name="i-lucide-chevron-down" />
				</div>

				<div
					:class="[
						'space-y-1 overflow-hidden',
						expandedCategories[group.id] ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0',
					]">
					<UnifiedNavItem
						v-for="tool in group.items"
						:key="tool.id"
						:icon="tool.icon"
						:label="tool.name"
						:active="isActive(tool.to)"
						:to="tool.to" />
				</div>
			</div>
		</div>

		<div class="flex-none p-4 mx-2">
			<UCard>
				<div class="flex items-center gap-3">
					<UAvatar
						:src="userAvatar"
						alt="avatar"
						size="md" />
					<div class="flex flex-col flex-1 min-w-0">
						<span class="truncate">石头鱼</span>
						<span>全栈工程师</span>
					</div>
					<UButton
						variant="ghost"
						size="xs"
						icon="i-lucide-settings"
						square />
				</div>
			</UCard>
		</div>
	</aside>
</template>

<script setup lang="ts">
	import { computed, ref } from 'vue'
	import { useRoute } from 'vue-router'

	import UnifiedNavItem from '../../components/UnifiedNavItem.vue'
	import userAvatar from '../../assets/user.png'
	import { getTools } from '../../tools/registry'
	import type { ToolCategory, ToolItem } from '../../shared/types/tool'

	const route = useRoute()

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

	// 分类展开/收起状态
	const expandedCategories = ref<Record<string, boolean>>(Object.fromEntries(toolGroups.value.map((g) => [g.id, true])))

	function toggleCategory(categoryId: string) {
		expandedCategories.value[categoryId] = !expandedCategories.value[categoryId]
	}

	function isActive(path: string) {
		return route.path === path
	}
</script>
