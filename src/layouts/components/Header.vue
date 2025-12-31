<template>
	<header
		class="sticky top-4 z-40 mb-4 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
		:class="isScrolled ? '-translate-y-2.5' : ''">
		<div class="max-w-[1400px] mx-auto px-6 md:px-8">
			<div
				class="bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.03)] ring-1 ring-white/50 rounded-full px-6 py-3 flex items-center justify-between hover:shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:bg-white/80 transition-all">
				<!-- 左侧：增强面包屑导航 -->
				<div class="flex items-center">
					<template v-if="route.path === '/'">
						<div class="flex items-center gap-2">
							<span class="bg-linear-to-r from-teal-600 to-emerald-600 text-transparent bg-clip-text text-lg font-bold">
								你来啦~石头鱼
							</span>
							<span class="text-xl animate-wave origin-bottom-right">👋</span>
						</div>
					</template>
					<template v-else-if="route.path === '/tools'">
						<div class="flex items-center gap-2 text-sm">
							<UButton
								variant="ghost"
								size="sm"
								:ui="{
									base: 'flex items-center gap-1.5 px-2 py-1 rounded-lg text-emerald-600 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 transition-all active:scale-95 shadow-sm',
								}"
								@click="$router.push('/')">
								<UIcon
									name="i-lucide-home"
									class="size-3.5" />
								<span class="font-medium">首页</span>
							</UButton>

							<UIcon
								name="i-lucide-chevron-right"
								class="size-3.5 text-slate-300" />

							<span class="px-2 py-1 font-bold text-slate-800">所有工具</span>
						</div>
					</template>
					<template v-else>
						<div class="flex items-center gap-2 text-sm">
							<UButton
								variant="ghost"
								size="sm"
								:ui="{
									base: 'flex items-center gap-1.5 px-2 py-1 rounded-lg text-emerald-600 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 transition-all active:scale-95 shadow-sm',
								}"
								@click="$router.push('/')">
								<UIcon
									name="i-lucide-home"
									class="size-3.5" />
								<span class="font-medium">首页</span>
							</UButton>

							<UIcon
								name="i-lucide-chevron-right"
								class="size-3.5 text-slate-300" />

							<span class="px-2 py-1 rounded-lg text-teal-700 bg-teal-50 border border-teal-200 font-medium shadow-sm">
								{{ currentTool?.category }}
							</span>

							<UIcon
								name="i-lucide-chevron-right"
								class="size-3.5 text-slate-300" />

							<span class="px-2 py-1 font-bold text-slate-800">{{ currentTool?.name }}</span>
						</div>
					</template>
				</div>

				<!-- 右侧操作按钮 -->
				<div class="flex items-center gap-3">
					<!-- 搜索按钮 -->
					<UButton
						variant="ghost"
						:ui="{
							base: 'hidden md:flex items-center gap-2 px-3 h-10 rounded-full bg-white/50 border border-transparent hover:border-slate-200 hover:bg-white text-slate-400 hover:text-teal-600 transition-all shadow-sm active:scale-90 group',
						}"
						@click="searchOpen = true">
						<UIcon
							name="i-lucide-search"
							class="size-4.5" />
						<span class="text-sm font-medium">Search</span>
						<div class="ml-0.5 flex items-center gap-0.5">
							<kbd
								class="px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 rounded shadow-sm group-hover:border-teal-200 group-hover:text-teal-600 transition-colors">
								⌘
							</kbd>
							<kbd
								class="px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-white border border-slate-200 rounded shadow-sm group-hover:border-teal-200 group-hover:text-teal-600 transition-colors">
								K
							</kbd>
						</div>
					</UButton>

					<!-- 通知按钮 -->
					<UButton
						variant="ghost"
						size="sm"
						:ui="{
							base: 'w-10 h-10 rounded-full bg-white/50 border border-transparent hover:border-slate-200 hover:bg-white flex items-center justify-center text-slate-400 hover:text-teal-600 transition-all shadow-sm active:scale-90',
						}">
						<UIcon
							name="i-lucide-bell"
							class="size-4.5" />
					</UButton>

					<!-- 暗色模式按钮 -->
					<UButton
						variant="ghost"
						size="sm"
						:ui="{
							base: 'w-10 h-10 rounded-full bg-white/50 border border-transparent hover:border-slate-200 hover:bg-white flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all shadow-sm active:scale-90',
						}">
						<UIcon
							name="i-lucide-moon"
							class="size-4.5" />
					</UButton>
				</div>
			</div>
		</div>

		<UDashboardSearch
			v-model:open="searchOpen"
			:groups="searchGroups"
			:color-mode="false"
			placeholder="搜索工具、功能..." />
	</header>
</template>

<script setup lang="ts">
	import { computed, inject, onMounted, onUnmounted, ref } from 'vue'
	import { useRoute, useRouter } from 'vue-router'

	import { getTools } from '@/tools/registry'

	const route = useRoute()
	const router = useRouter()

	// 注入搜索框状态（由 AppShell 提供）
	const dashboardSearchOpen = inject<{ value: boolean }>('dashboardSearchOpen', ref(false))
	const searchOpen = computed({
		get: () => dashboardSearchOpen.value,
		set: (value) => {
			dashboardSearchOpen.value = value
		},
	})
	// 页面滚动状态：用于控制 Header 的粘性动画
	const isScrolled = ref(false)

	/**
	 * 处理页面滚动事件
	 * 当滚动超过 10px 时，触发 Header 的粘性动画效果
	 */
	function handleScroll() {
		isScrolled.value = window.scrollY > 10
	}

	onMounted(() => {
		window.addEventListener('scroll', handleScroll)
	})

	onUnmounted(() => {
		window.removeEventListener('scroll', handleScroll)
	})

	// 所有工具列表
	const tools = computed(() => getTools())
	// 当前路由对应的工具信息
	const currentTool = computed(() => {
		return tools.value.find((tool) => tool.to === route.path)
	})

	/**
	 * 搜索命令组：将工具按分类组织，用于全局搜索功能
	 */
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
