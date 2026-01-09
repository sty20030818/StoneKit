<template>
	<!-- 预设按钮 -->
	<UButton
		:variant="active ? 'solid' : 'soft'"
		:color="active ? 'teal' : 'gray'"
		class="rounded-full"
		@click="emit('click')">
		<UIcon
			:name="preset.icon"
			class="size-4 mr-1" />
		{{ preset.label }}
	</UButton>
</template>

<script setup lang="ts">
	import type { Preset } from '../types'

	defineProps<{
		preset: Preset
		active: boolean
	}>()

	const emit = defineEmits<{
		(e: 'click'): void
	}>()
</script>
