<template>
	<!-- 格式选择按钮 -->
	<UButton
		:variant="active ? 'soft' : 'ghost'"
		:color="active ? 'teal' : 'gray'"
		class="flex-1 rounded-[12px]"
		@click="emit('click')">
		<span class="font-medium">{{ label }}</span>
		<UBadge
			v-if="badge"
			variant="soft"
			color="amber"
			size="xs"
			class="ml-1">
			{{ badge }}
		</UBadge>
		<UBadge
			v-if="recommended && !active"
			variant="soft"
			color="teal"
			size="xs"
			class="ml-1">
			推荐
		</UBadge>
	</UButton>
</template>

<script setup lang="ts">
	defineProps<{
		label: string
		active: boolean
		recommended?: boolean
		badge?: string
	}>()

	const emit = defineEmits<{
		(e: 'click'): void
	}>()
</script>
