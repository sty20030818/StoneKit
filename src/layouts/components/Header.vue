<template>
	<header class="sticky top-0 mb-6 pt-4 px-4 md:px-6">
		<div class="mx-auto max-w-7xl">
			<div class="px-6 py-3 flex items-center justify-between">
				<div class="flex items-center">
					<template v-if="route.path === '/'">
						<span>你来啦~石头鱼</span>
					</template>
					<template v-else>
						<div class="flex items-center gap-2">
							<UButton
								to="/"
								variant="ghost"
								size="sm">
								<UIcon name="i-lucide-home" />
								<span>首页</span>
							</UButton>

							<UIcon name="i-lucide-chevron-right" />

							<span>{{ currentTool?.category }}</span>

							<UIcon name="i-lucide-chevron-right" />

							<span>{{ currentTool?.name }}</span>
						</div>
					</template>
				</div>

				<div class="flex items-center gap-3">
					<UButton
						@click="searchOpen = true">
						<UIcon name="i-lucide-search" />
						<span>搜索</span>
					</UButton>

					<UButton
						variant="ghost"
						size="sm"
						icon="i-lucide-bell"
						square />
				</div>
			</div>
		</div>

		<UDashboardSearch
			v-model:open="searchOpen"
			:groups="searchGroups"
			:color-mode="false" />
	</header>
</template>

<script setup lang="ts">
	import { computed, ref } from 'vue'
	import { provide } from 'vue'
	import { useRoute, useRouter } from 'vue-router'

	import { getTools } from '../../tools/registry'

	const route = useRoute()
	const router = useRouter()

	const searchOpen = ref(false)
	provide('dashboardSearchOpen', searchOpen)

	const tools = computed(() => getTools())
	const currentTool = computed(() => {
		return tools.value.find((tool) => tool.to === route.path)
	})

	const searchGroups = computed(() => {
		type ToolCommandItem = {
			label: string
			description: string
			icon: string
			to: string
			onSelect: () => void
		}

		type ToolCommandGroup = {
			id: string
			label: string
			items: ToolCommandItem[]
		}

		const groups = new Map<string, ToolCommandGroup>()

		for (const tool of tools.value) {
			const groupId = tool.category
			let group = groups.get(groupId)
			if (!group) {
				group = { id: groupId, label: tool.category, items: [] }
				groups.set(groupId, group)
			}

			group.items.push({
				label: tool.name,
				description: tool.description,
				icon: tool.icon,
				to: tool.to,
				onSelect: () => router.push(tool.to),
			})
		}

		return Array.from(groups.values())
	})
</script>
