<template>
	<div class="h-dvh w-full flex">
		<div class="flex flex-1 min-h-0">
			<Sidebar class="hidden lg:flex" />

			<div class="flex flex-col flex-1 min-h-0 min-w-0">
				<main class="min-w-0 flex-1 overflow-y-auto px-4 md:px-6">
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
