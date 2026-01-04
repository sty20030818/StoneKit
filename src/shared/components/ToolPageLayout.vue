<template>
	<div class="px-8 py-8 flex-1 min-h-0 overflow-hidden">
		<div class="h-full">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
	defineOptions({
		name: 'ToolPageLayout',
	})
</script>
