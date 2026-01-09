<template>
	<!-- 统计卡片 -->
	<div class="bg-white/60 rounded-[16px] p-3 text-center">
		<div
			class="w-8 h-8 rounded-[10px] flex items-center justify-center mb-2 mx-auto"
			:class="iconBgClass">
			<UIcon
				:name="icon"
				class="size-4"
				:class="iconClass" />
		</div>
		<p class="text-lg font-bold text-slate-700">{{ value }}</p>
		<p class="text-xs text-slate-400">{{ label }}</p>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue'

	const props = defineProps<{
		label: string
		value: string
		icon: string
		color?: 'slate' | 'teal' | 'emerald'
	}>()

	const iconBgClass = computed(() => {
		switch (props.color) {
			case 'emerald':
				return 'bg-emerald-100'
			case 'teal':
				return 'bg-teal-100'
			default:
				return 'bg-slate-100'
		}
	})

	const iconClass = computed(() => {
		switch (props.color) {
			case 'emerald':
				return 'text-emerald-600'
			case 'teal':
				return 'text-teal-600'
			default:
				return 'text-slate-500'
		}
	})
</script>
