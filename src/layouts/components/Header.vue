<template>
	<header
		class="sticky top-4 z-40 mb-8 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
		:class="isScrolled ? '-translate-y-2.5' : ''">
		<div class="mx-auto bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.03)] ring-1 ring-white/50 rounded-full px-6 py-3 flex items-center justify-between hover:shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:bg-white/80 transition-all">
			<!-- Left Title -->
			<div class="flex items-center gap-4 pl-2">
				<button
					v-if="route.path !== '/'"
					class="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors active:scale-90"
					@click="$router.push('/')">
					<UIcon
						name="i-lucide-chevron-right"
						class="size-4.5 rotate-180" />
				</button>

				<h1 class="text-xl font-bold text-slate-700 tracking-tight flex items-center gap-2">
					<template v-if="route.path === '/'">
						<span class="bg-gradient-to-r from-teal-500 to-emerald-500 text-transparent bg-clip-text">你来啦~石头鱼</span>
					</template>
					<template v-else>
						<span class="text-slate-400 font-medium text-sm">{{ currentTool?.category }}</span>
						<span class="text-slate-300">/</span>
						<span>{{ currentTool?.name }}</span>
					</template>
				</h1>
			</div>

			<!-- Right Actions -->
			<div class="flex items-center gap-3">
				<!-- Search Pill -->
				<button
					class="hidden md:flex items-center gap-3 px-5 py-2.5 bg-slate-50/50 hover:bg-white border border-transparent hover:border-teal-200 rounded-full transition-all duration-300 cursor-pointer active:scale-95 outline-none group w-64"
					@click="searchOpen = true">
					<UIcon
						name="i-lucide-search"
						class="size-4 text-slate-400 group-hover:text-teal-500 transition-colors" />
					<span class="text-sm font-medium text-slate-400 group-hover:text-slate-600">Type / to search...</span>
					<div class="ml-auto flex items-center gap-1 px-1.5 py-0.5 bg-white rounded-md border border-slate-200 shadow-sm text-[10px] font-bold text-slate-400 group-hover:border-teal-200 group-hover:text-teal-600">
						<span>⌘</span><span>K</span>
					</div>
				</button>

				<!-- Buttons -->
				<button class="w-10 h-10 rounded-full bg-white/50 border border-transparent hover:border-slate-200 hover:bg-white flex items-center justify-center text-slate-400 hover:text-teal-600 transition-all shadow-sm active:scale-90">
					<UIcon
						name="i-lucide-bell"
						class="size-4.5" />
				</button>
				<button class="w-10 h-10 rounded-full bg-white/50 border border-transparent hover:border-slate-200 hover:bg-white flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all shadow-sm active:scale-90">
					<UIcon
						name="i-lucide-moon"
						class="size-4.5" />
				</button>
			</div>
		</div>

		<UDashboardSearch
			v-model:open="searchOpen"
			:groups="searchGroups"
			:color-mode="false" />
	</header>
</template>

<script setup lang="ts">
	import { computed, onMounted, onUnmounted, ref } from 'vue'
	import { provide } from 'vue'
	import { useRoute, useRouter } from 'vue-router'

	import { getTools } from '../../tools/registry'

	const route = useRoute()
	const router = useRouter()

	const searchOpen = ref(false)
	const isScrolled = ref(false)
	provide('dashboardSearchOpen', searchOpen)

	function handleScroll() {
		isScrolled.value = window.scrollY > 10
	}

	onMounted(() => {
		window.addEventListener('scroll', handleScroll)
	})

	onUnmounted(() => {
		window.removeEventListener('scroll', handleScroll)
	})

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
