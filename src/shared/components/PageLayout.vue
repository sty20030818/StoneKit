<template>
	<div class="max-w-[1400px] mx-auto px-6 md:px-8 pt-6 md:pt-8 min-h-full flex flex-col">
		<!-- 可选头部区域 -->
		<header v-if="$slots.header">
			<slot name="header" />
		</header>

		<!-- 主体区域 -->
		<main class="flex-1 pb-6 md:pb-8">
			<slot />
		</main>
	</div>
</template>

<script setup lang="ts">
	defineOptions({
		name: 'PageLayout',
	})
</script>
