<template>
	<UCard
		:ui="{
			root: [
				'group relative bg-white p-4 rounded-[24px] border border-slate-100/80 transition-all duration-500 cursor-pointer hover:-translate-y-1 hover:shadow-elevation-3 active:scale-[0.99] active:translate-y-0 min-h-[168px] divide-y-0',
				empty ? 'border-dashed border-slate-300/80 bg-white/40 hover:bg-white/70' : '',
			].join(' '),
			// empty 状态下：隐藏 header，只在 body 里做居中
			header: empty ? 'hidden p-0 m-0' : '',
			body: empty ? 'flex items-center justify-center h-full p-0' : '',
		}"
		@click="handleClick">
		<!-- header slot：可由父组件自定义；未提供时，仅在非 empty 且有 tool 时渲染默认头部 -->
		<template #header>
			<!-- 父组件自定义 header 时，优先使用外部内容 -->
			<slot
				v-if="$slots.header"
				name="header" />

			<!-- 默认 header：只有在非 empty 且存在 tool 时展示 -->
			<div
				v-else-if="!empty && tool"
				class="flex items-start justify-between">
				<div
					:class="[
						'w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ease-out group-hover:rotate-12 group-hover:scale-110 shadow-sm relative overflow-hidden',
						getToolColorClass(tool.id),
					]">
					<UIcon
						:name="tool.icon"
						class="size-5 relative z-10" />
					<div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
				</div>

				<UButton
					variant="ghost"
					color="gray"
					size="xs"
					icon="i-lucide-star"
					:class="[
						'size-8 rounded-full bg-white/80 backdrop-blur',
						isFavorite(tool.id) ? 'text-amber-500' : 'text-slate-400/70',
					]"
					:title="isFavorite(tool.id) ? '取消收藏' : '收藏'"
					square
					@click.prevent.stop="toggleFavorite(tool.id)" />
			</div>
		</template>

		<!-- 默认主体内容：支持父组件自定义；否则根据 empty / tool 渲染默认内容 -->
		<template #default>
			<!-- 若父组件提供 default slot，则完全交给父组件渲染 -->
			<slot v-if="$slots.default" />

			<!-- Empty 状态默认内容 -->
			<UIcon
				v-else-if="empty"
				name="i-lucide-plus"
				class="size-10 text-slate-300 group-hover:text-teal-500 transition-colors" />

			<!-- 正常工具卡片默认内容 -->
			<div
				v-else-if="tool"
				class="space-y-1.5">
				<h3 class="text-base font-bold text-slate-800 mb-1.5 group-hover:text-teal-600 transition-colors">
					{{ tool.name }}
				</h3>
				<p class="text-slate-400 text-sm leading-relaxed line-clamp-2 group-hover:text-slate-500 transition-colors">
					{{ tool.description }}
				</p>
			</div>
		</template>
	</UCard>
</template>

<script setup lang="ts">
	import { computed } from 'vue'
	import { useRouter } from 'vue-router'

	import type { ToolItem } from '../shared/types/tool'
	import { useToolFavoritesStore } from '../stores/toolFavorites'

	interface Props {
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

	const favoritesStore = useToolFavoritesStore()
	const { isFavorite, toggleFavorite } = favoritesStore

	function handleClick() {
		if (props.empty) {
			emit('click')
			return
		}
		if (tool.value?.to) {
			router.push(tool.value.to)
		}
	}

	function getToolColorClass(toolId: string): string {
		const colorMap: Record<string, string> = {
			'json-format': 'tool-color-blue',
			'base64-encoder': 'tool-color-indigo',
			'regex-tester': 'tool-color-amber',
			'image-compress': 'tool-color-rose',
			'css-generator': 'tool-color-purple',
			'color-extract': 'tool-color-pink',
			'md5-hash': 'tool-color-emerald',
			'svg-base64': 'tool-color-teal',
		}
		return colorMap[toolId] || 'tool-color-slate'
	}
</script>
