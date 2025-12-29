<template>
	<div class="mx-auto max-w-7xl space-y-8 pb-12">
		<!-- 可选头部区域 -->
		<header
			v-if="$slots.header"
			class="space-y-6">
			<slot name="header" />
		</header>

		<!-- 主体区域 -->
		<main class="space-y-6">
			<slot />
		</main>
	</div>
</template>

<script setup lang="ts">
	defineOptions({
		name: 'PageLayout',
	})
</script>
