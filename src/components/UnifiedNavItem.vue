<template>
	<RouterLink
		:to="to"
		class="w-full flex items-center gap-3 px-4 py-3.5 rounded-full transition-all duration-300 ease-out group relative active:scale-[0.98] mb-1.5"
		:class="[
			active
				? 'text-white shadow-[inset_0_2px_8px_rgba(20,184,166,0.2),0_2px_8px_rgba(20,184,166,0.25)]'
				: 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:shadow-sm',
		]">
		<!-- Active Background -->
		<div
			class="absolute inset-0 bg-linear-to-r from-teal-400 to-emerald-400 rounded-full overflow-hidden"
			:class="active ? 'opacity-100' : 'opacity-0'" />

		<!-- Icon -->
		<span
			class="relative z-10 transition-transform duration-300 ease-out"
			:class="active ? 'scale-110' : 'group-hover:scale-110 group-hover:rotate-6'">
			<UIcon
				:name="icon"
				class="size-[18px]"
				:class="active ? 'text-white' : 'text-slate-500'" />
		</span>

		<!-- Label -->
		<span
			class="relative z-10 text-sm font-bold tracking-wide transition-colors duration-75"
			:class="active ? 'text-white' : 'text-slate-500'">
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
