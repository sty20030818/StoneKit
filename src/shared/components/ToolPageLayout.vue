<template>
	<div class="tool-page-layout h-[calc(100dvh-4.5rem-1rem*2)] overflow-hidden">
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

<style scoped>
	.tool-page-layout {
		/* 统一间距：1rem (与 sidebar 的 my-4 一致) */
		--spacing: 1rem;

		/* 所有边距统一为 1rem */
		padding: var(--spacing);
	}

	/* 大屏幕：左侧需要加上 sidebar 宽度(270px) */
	@media (min-width: 1024px) {
		.tool-page-layout {
			padding-left: calc(270px + var(--spacing));
		}
	}
</style>
