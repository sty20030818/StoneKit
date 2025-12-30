<template>
	<UModal
		v-model:open="localOpen"
		title="添加到常用"
		:scrollable="true"
		:ui="{ content: 'w-[min(720px,calc(100vw-2rem))]' }">
		<template #body>
			<div class="grid grid-cols-1 gap-2">
				<UButton
					v-for="tool in pickableTools"
					:key="tool.id"
					variant="ghost"
					color="neutral"
					class="flex w-full items-center justify-start gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 text-left hover:bg-slate-50"
					@click="handleAdd(tool.id)">
					<div class="flex items-center gap-3">
						<div class="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-100 bg-slate-50">
							<UIcon
								:name="tool.icon"
								class="size-4.5 text-teal-600" />
						</div>
						<div class="min-w-0">
							<div class="truncate text-sm font-extrabold text-slate-800">
								{{ tool.name }}
							</div>
							<div class="truncate text-xs text-slate-500">
								{{ tool.description }}
							</div>
						</div>
					</div>
				</UButton>
			</div>

			<EmptyState
				v-if="!pickableTools.length"
				class="mt-4"
				icon="i-lucide-party-popper"
				title="已经全部加入常用了"
				description="可以在侧边栏或工具页中继续探索更多功能。" />
		</template>

		<template #footer>
			<div class="text-xs text-slate-400">
				可添加：{{ pickableTools.length }} 个 / 总数：{{ allCount }} 个 / 已收藏：{{ favoriteCount }} 个
			</div>
		</template>
	</UModal>
</template>

<script setup lang="ts">
	import { computed } from 'vue'

	import type { ToolItem } from '../../../shared/types/tool'
	import EmptyState from '../../../shared/components/EmptyState.vue'

	type Props = {
		open: boolean
		pickableTools: ToolItem[]
		allCount: number
		favoriteCount: number
	}

	const props = defineProps<Props>()

	const emit = defineEmits<{
		(event: 'update:open', value: boolean): void
		(event: 'add', id: string): void
	}>()

	const localOpen = computed({
		get: () => props.open,
		set: (value: boolean) => emit('update:open', value),
	})

	function handleAdd(id: string) {
		emit('add', id)
	}

	const pickableTools = computed(() => props.pickableTools)
	const allCount = computed(() => props.allCount)
	const favoriteCount = computed(() => props.favoriteCount)

	defineOptions({
		name: 'ToolFavoritesPicker',
	})
</script>
