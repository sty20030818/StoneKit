<template>
	<UEmpty
		:icon="icon"
		:title="title"
		:description="description"
		:variant="variant"
		:size="size">
		<template
			v-if="$slots.icon"
			#icon>
			<slot name="icon" />
		</template>

		<template
			v-if="$slots.title"
			#title>
			<slot name="title" />
		</template>

		<template
			v-if="$slots.description"
			#description>
			<slot name="description" />
		</template>

		<template
			v-if="$slots.actions"
			#actions>
			<slot name="actions" />
		</template>
	</UEmpty>
</template>

<script setup lang="ts">
	type EmptyVariant = 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | 'naked'
	type EmptySize = 'sm' | 'md' | 'lg' | 'xl'

	interface Props {
		icon?: string
		title?: string
		description?: string
		variant?: EmptyVariant
		size?: EmptySize
	}

	withDefaults(defineProps<Props>(), {
		variant: 'naked',
		size: 'md',
	})

	defineOptions({
		name: 'EmptyState',
	})
</script>
