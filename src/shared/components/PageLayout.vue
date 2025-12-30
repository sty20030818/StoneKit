<template>
	<div class="max-w-[1400px] mx-auto p-6 md:p-8 min-h-full flex flex-col">
		<!-- 可选头部区域 -->
		<header
			v-if="$slots.header"
			class="mb-8">
			<slot name="header" />
		</header>

		<!-- 主体区域 -->
		<main class="flex-1">
			<slot />
		</main>
	</div>
</template>

<script setup lang="ts">
	defineOptions({
		name: 'PageLayout',
	})
</script>
