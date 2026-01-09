<template>
	<UApp :toaster="toasterConfig">
		<AppShell />
	</UApp>
</template>

<script setup lang="ts">
	import AppShell from '@/layouts/AppShell.vue'

	// 全局 Toaster 配置
	const toasterConfig = {
		position: 'top-right' as const,
		offset: '80px', // 下移以避免遮住 header
	}
</script>
