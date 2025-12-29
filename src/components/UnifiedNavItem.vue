<template>
	<UButton
		:to="to"
		variant="ghost"
		:class="[
			'w-full flex items-center gap-3 px-3 py-2.5 mb-1.5 rounded-full group relative',
			active
				? 'text-teal-700 bg-teal-500/12 ring-1 ring-teal-500/15'
				: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60',
		]"
		:style="{ transition: 'background-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease' }">
		<!-- Icon with subtle shift -->
		<span
			:class="[active ? 'text-teal-700' : 'group-hover:text-teal-600']"
			style="transition: color 0.15s ease">
			<UIcon
				:name="icon"
				class="size-[18px]" />
		</span>

		<!-- Text with subtle shift -->
		<span
			:class="['text-sm truncate z-10', active ? 'font-semibold' : 'font-medium']"
			style="transition: color 0.15s ease">
			{{ label }}
		</span>

		<!-- Right Indicator -->
		<div
			v-if="active"
			class="absolute right-3 flex items-center"
			style="transition: opacity 0.15s ease">
			<div class="w-1.5 h-1.5 bg-teal-600 rounded-full" />
		</div>
	</UButton>
</template>

<script setup lang="ts">
	interface Props {
		icon: string
		label: string
		active: boolean
		to: string
	}

	defineProps<Props>()
</script>
