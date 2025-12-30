<template>
	<div class="h-dvh w-full flex bg-[#F0F4F8] relative overflow-hidden">
		<!-- Background Ambience -->
		<div class="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
			<div class="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-teal-100/40 rounded-full blur-[120px] mix-blend-multiply opacity-50 animate-pulse" style="animation-duration: 10s;" />
			<div class="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-100/40 rounded-full blur-[100px] mix-blend-multiply opacity-50 animate-pulse" style="animation-duration: 12s;" />
		</div>

		<div class="flex flex-1 min-h-0 relative z-10">
			<Sidebar class="hidden lg:flex" />

			<div class="flex flex-col flex-1 min-h-0 min-w-0">
				<main class="min-w-0 flex-1 overflow-y-auto px-4 md:px-6 custom-scrollbar">
					<Header />
					<div class="min-h-0">
						<RouterView />
					</div>
				</main>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { RouterView } from 'vue-router'

	import Sidebar from './components/Sidebar.vue'
	import Header from './components/Header.vue'
</script>
