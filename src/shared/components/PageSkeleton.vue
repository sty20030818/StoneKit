<template>
	<div class="space-y-6">
		<div class="space-y-3">
			<USkeleton class="h-7 w-40" />
			<USkeleton class="h-4 w-64" />
		</div>

		<div class="space-y-4">
			<USkeleton
				v-for="index in rows"
				:key="index"
				class="h-16 w-full rounded-2xl" />
		</div>
	</div>
</template>

<script setup lang="ts">
	interface Props {
		rows?: number
	}

	withDefaults(defineProps<Props>(), {
		rows: 3,
	})

	defineOptions({
		name: 'PageSkeleton',
	})
</script>
