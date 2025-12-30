<template>
	<RouterLink
		:to="to"
		class="w-full flex items-center gap-3 px-4 py-3.5 rounded-full transition-all duration-300 group relative overflow-hidden active:scale-[0.98] mb-1.5"
		:class="[
			active
				? 'text-white shadow-lg shadow-teal-500/20 translate-x-1'
				: 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:shadow-sm hover:translate-x-0.5',
		]">
		<!-- Active Background -->
		<div
			v-if="active"
			class="absolute inset-0 bg-linear-to-r from-teal-400 to-emerald-400 rounded-full" />

		<!-- Icon -->
		<span
			class="relative z-10 transition-transform duration-300"
			:class="active ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-6'">
			<UIcon
				:name="icon"
				class="size-[18px]" />
		</span>

		<!-- Label -->
		<span
			class="relative z-10 text-sm font-bold tracking-wide transition-all duration-300"
			:class="active ? 'translate-x-1' : ''">
			{{ label }}
		</span>

		<!-- Indicator -->
		<div
			v-if="active"
			class="absolute right-4 w-2 h-2 bg-white rounded-full animate-pulse shadow-sm" />
	</RouterLink>
</template>

<script setup lang="ts">
	import { RouterLink } from 'vue-router'

	type Props = {
		icon: string
		label: string
		active: boolean
		to: string
	}

	defineProps<Props>()
</script>
