<template>
	<!-- 空状态卡片：用于添加新工具 -->
	<UCard
		v-if="empty"
		:ui="{
			root: 'group relative bg-white/40 p-4 rounded-[28px] border border-dashed border-slate-300/80 hover:bg-white/70 transition-all duration-300 cursor-pointer hover:-translate-y-1.5 active:scale-[0.98] h-full min-h-[208px] flex items-center justify-center divide-y-0',
		}"
		@click="handleClick">
		<UIcon
			name="i-lucide-plus"
			class="size-10 text-slate-300 group-hover:text-teal-500 transition-colors" />
	</UCard>

	<!-- 正常工具卡片：显示工具信息 -->
	<UCard
		v-else-if="tool"
		:ui="{
			root: [
				'group relative bg-white p-4 rounded-[28px] border border-slate-100/80 shadow-sm transition-all duration-300 cursor-pointer hover:-translate-y-1.5 hover:bg-white/90 active:scale-[0.98] flex flex-col divide-y-0',
				getToolBorderClass(tool.id),
				getToolShadowClass(tool.id),
			].join(' '),
		}"
		@click="handleClick">
		<div class="flex items-start justify-between mb-3">
			<!-- 图标容器：带弹跳动画效果 -->
			<div
				class="w-14 h-14 rounded-[20px] flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:-rotate-3 shadow-sm ring-4 ring-transparent group-hover:ring-white/50"
				:class="getToolColorClass(tool.id)">
				<UIcon
					:name="tool.icon"
					class="size-6 transition-transform duration-300 group-hover:scale-110" />
			</div>

			<!-- 箭头图标：悬停时淡入和滑动效果 -->
			<div
				class="opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out delay-75">
				<div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-teal-500 shadow-sm">
					<UIcon
						name="i-lucide-arrow-right"
						class="size-4" />
				</div>
			</div>
		</div>

		<h3 class="text-base font-bold text-slate-700 mb-1 group-hover:text-teal-600 transition-colors">
			{{ tool.name }}
		</h3>
		<p class="text-slate-400 text-xs leading-relaxed line-clamp-2 group-hover:text-slate-500 transition-colors">
			{{ tool.description }}
		</p>
	</UCard>
</template>

<script setup lang="ts">
	import { computed } from 'vue'
	import { useRouter } from 'vue-router'

	import type { ToolItem } from '@/shared/types/tool'

	type Props = {
		tool?: ToolItem
		empty?: boolean
	}

	const props = withDefaults(defineProps<Props>(), {
		empty: false,
	})

	const emit = defineEmits<{
		(event: 'click'): void
	}>()

	const router = useRouter()
	const tool = computed(() => props.tool)
	const empty = computed(() => props.empty)

	function handleClick() {
		if (props.empty) {
			emit('click')
			return
		}
		if (tool.value?.to) {
			router.push(tool.value.to)
		}
	}

	/**
	 * 根据工具 ID 获取对应的颜色样式类
	 * @param toolId 工具的唯一标识符
	 * @returns 对应的 Tailwind CSS 颜色类名
	 */
	function getToolColorClass(toolId: string): string {
		const colorMap: Record<string, string> = {
			'json-format': 'bg-blue-50 text-blue-600',
			'base64-encoder': 'bg-indigo-50 text-indigo-600',
			'regex-tester': 'bg-amber-50 text-amber-600',
			'image-compress': 'bg-rose-50 text-rose-600',
			'css-generator': 'bg-purple-50 text-purple-600',
			'color-extract': 'bg-pink-50 text-pink-600',
			'md5-hash': 'bg-emerald-50 text-emerald-600',
			'svg-base64': 'bg-teal-50 text-teal-600',
		}
		return colorMap[toolId] || 'bg-slate-50 text-slate-600'
	}

	/**
	 * 根据工具 ID 获取对应的边框样式类
	 * @param toolId 工具的唯一标识符
	 * @returns 对应的 Tailwind CSS 边框类名
	 */
	function getToolBorderClass(toolId: string): string {
		const borderMap: Record<string, string> = {
			'json-format': 'hover:border-blue-200',
			'base64-encoder': 'hover:border-indigo-200',
			'regex-tester': 'hover:border-amber-200',
			'image-compress': 'hover:border-rose-200',
			'css-generator': 'hover:border-purple-200',
			'color-extract': 'hover:border-pink-200',
			'md5-hash': 'hover:border-emerald-200',
			'svg-base64': 'hover:border-teal-200',
		}
		return borderMap[toolId] || 'hover:border-slate-200'
	}

	/**
	 * 根据工具 ID 获取对应的阴影样式类
	 * @param toolId 工具的唯一标识符
	 * @returns 对应的 Tailwind CSS 阴影类名
	 */
	function getToolShadowClass(toolId: string): string {
		const shadowMap: Record<string, string> = {
			'json-format': 'hover:shadow-blue-500/20',
			'base64-encoder': 'hover:shadow-indigo-500/20',
			'regex-tester': 'hover:shadow-amber-500/20',
			'image-compress': 'hover:shadow-rose-500/20',
			'css-generator': 'hover:shadow-purple-500/20',
			'color-extract': 'hover:shadow-pink-500/20',
			'md5-hash': 'hover:shadow-emerald-500/20',
			'svg-base64': 'hover:shadow-teal-500/20',
		}
		return shadowMap[toolId] || 'hover:shadow-slate-500/20'
	}
</script>
