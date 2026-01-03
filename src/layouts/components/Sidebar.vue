<template>
	<aside
		class="w-[270px] shrink-0 mt-4 mb-8 ml-8 flex flex-col z-50 rounded-[36px] bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-white/50 transition-all hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)]">
		<!-- Logo -->
		<div class="h-24 flex items-center px-7">
			<div
				class="flex items-center gap-3 cursor-pointer group active:scale-95 transition-transform"
				@click="$router.push('/')">
				<div class="relative">
					<div
						class="w-10 h-10 bg-linear-to-tr from-teal-400 to-emerald-400 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-teal-500/20 transition-all duration-500 group-hover:rotate-360 group-hover:scale-110">
						<UIcon
							name="i-lucide-box"
							class="size-5" />
					</div>
					<div
						class="absolute -bottom-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center shadow-sm">
						<div class="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
					</div>
				</div>
				<div>
					<span class="text-xl font-extrabold text-slate-700 tracking-tight block">StoneKit</span>
					<span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block pl-0.5">
						Toolbox v1.0.0
					</span>
				</div>
			</div>
		</div>

		<!-- Nav -->
		<div class="flex-1 overflow-y-auto px-5 py-2 pr-8 custom-scrollbar">
			<div class="mb-8">
				<p class="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 opacity-80">概览</p>
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

			<div>
				<p class="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 opacity-80">工具箱</p>
				<div
					v-for="group in toolGroups"
					:key="group.id"
					class="mb-4 group/category">
					<!-- Category Header with Toggle -->
					<div
						class="flex items-center justify-between px-3 py-1 mb-2 cursor-pointer select-none"
						@click="toggleCategory(group.id)">
						<span
							class="text-[11px] font-bold text-slate-400 uppercase tracking-widest group-hover/category:text-teal-600 transition-colors">
							{{ group.label }}
						</span>
						<div
							class="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 transition-all duration-300"
							:class="expandedCategories[group.id] ? 'rotate-180 bg-teal-50 text-teal-500' : ''">
							<UIcon
								name="i-lucide-chevron-down"
								class="size-3" />
						</div>
					</div>

					<!-- Collapsible Tool List -->
					<div
						class="space-y-1 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-top"
						:class="
							expandedCategories[group.id] ? 'max-h-[500px] opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95'
						">
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
		</div>

		<!-- User Profile -->
		<div class="p-5">
			<UCard
				:ui="{
					root: 'rounded-full bg-white/50 border border-white shadow-sm hover:bg-white hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer group',
					body: 'flex items-center gap-2.5 px-3 py-1.5 p-0',
				}">
				<UAvatar
					:src="userAvatar"
					alt="avatar"
					size="xs"
					class="group-hover:scale-105 transition-transform shrink-0" />
				<div class="flex flex-col overflow-hidden flex-1 min-w-0">
					<span class="text-xs font-bold text-slate-700 truncate group-hover:text-teal-600 transition-colors">
						石头鱼
					</span>
					<span class="text-[10px] text-slate-400 truncate">全栈工程师</span>
				</div>
				<div
					class="ml-auto p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors shrink-0">
					<UIcon
						name="i-lucide-settings"
						class="size-3.5 group-hover:rotate-90 transition-transform duration-500" />
				</div>
			</UCard>
		</div>
	</aside>
</template>

<script setup lang="ts">
	import { computed, ref } from 'vue'
	import { useRoute } from 'vue-router'

	import UnifiedNavItem from '@/components/UnifiedNavItem.vue'
	import userAvatar from '@/assets/user.png'
	import { getTools } from '@/tools/registry'
	import type { ToolCategory, ToolItem } from '@/shared/types/tool'

	const route = useRoute()

	const tools = computed(() => getTools())
	const toolGroups = computed(() => {
		const map = new Map<ToolCategory, ToolItem[]>()
		for (const tool of tools.value) {
			const arr = map.get(tool.category) ?? []
			arr.push(tool)
			map.set(tool.category, arr)
		}

		const groups = Array.from(map.entries()).map(([id, items]) => ({ id, label: id, items }))

		// 初始化折叠状态：所有分类默认展开
		groups.forEach((group) => {
			if (!(group.id in expandedCategories.value)) {
				expandedCategories.value[group.id] = true
			}
		})

		return groups
	})

	// 折叠状态管理：记录每个工具分类的展开/折叠状态，默认所有分类都展开
	const expandedCategories = ref<Record<string, boolean>>({})

	function toggleCategory(categoryId: string) {
		expandedCategories.value[categoryId] = !expandedCategories.value[categoryId]
	}

	function isActive(path: string) {
		return route.path === path
	}
</script>
