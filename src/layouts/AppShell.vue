<template>
	<div class="h-dvh w-full flex bg-[#F0F4F8] relative overflow-hidden">
		<!-- 背景氛围效果：渐变光晕动画 -->
		<div class="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
			<div
				class="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-teal-100/40 rounded-full blur-[120px] mix-blend-multiply opacity-50 animate-pulse"
				style="animation-duration: 10s" />
			<div
				class="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-100/40 rounded-full blur-[100px] mix-blend-multiply opacity-50 animate-pulse"
				style="animation-duration: 12s" />
		</div>

		<div class="flex flex-1 min-h-0 relative z-10">
			<Sidebar class="hidden lg:flex" />

			<div class="flex flex-col flex-1 min-h-0 min-w-0">
				<main class="min-w-0 flex-1 overflow-y-auto custom-scrollbar">
					<Header />
					<RouterView />
				</main>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, provide } from 'vue'
	import { RouterView } from 'vue-router'

	import Sidebar from '@/layouts/components/Sidebar.vue'
	import Header from '@/layouts/components/Header.vue'

	// 搜索框的打开状态：在 AppShell 中提供，让所有子组件都能访问
	const dashboardSearchOpen = ref(false)
	provide('dashboardSearchOpen', dashboardSearchOpen)
</script>
