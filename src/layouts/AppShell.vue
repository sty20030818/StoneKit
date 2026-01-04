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
				<main class="min-w-0 flex-1 flex flex-col overflow-hidden">
					<Header />
					<div class="flex-1 min-h-0 overflow-y-auto overflow-x-hidden custom-scrollbar">
						<RouterView v-slot="{ Component, route }">
							<Transition
								name="slide"
								mode="out-in">
								<div
									:key="route.path"
									class="flex flex-col h-full min-h-0">
									<component :is="Component" />
								</div>
							</Transition>
						</RouterView>
					</div>
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

<style>
	/* 页面滑动转场动画：左滑进、右滑出 */
	.slide-enter-active,
	.slide-leave-active {
		transition:
			transform 300ms cubic-bezier(0.4, 0, 0.2, 1),
			opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* 进入前状态：从左侧进入 */
	.slide-enter-from {
		transform: translateX(-80px);
		opacity: 0;
	}

	/* 进入后状态 */
	.slide-enter-to {
		transform: translateX(0);
		opacity: 1;
	}

	/* 离开后状态：向右侧退出 */
	.slide-leave-from {
		transform: translateX(0);
		opacity: 1;
	}

	.slide-leave-to {
		transform: translateX(80px);
		opacity: 0;
	}
</style>
