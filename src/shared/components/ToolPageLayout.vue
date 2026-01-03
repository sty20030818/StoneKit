<template>
	<div class="pl-8 pr-8 pt-8 h-[calc(100dvh-7rem)] overflow-hidden">
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
