<template>
	<div
		:class="[
			'min-h-screen w-full relative overflow-hidden transition-colors duration-700 bg-linear-to-br font-sans selection:text-white',
			theme.gradient,
			theme.selectionBg,
		]">
		<!-- 动态背景光斑 -->
		<div
			:class="[
				'absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-40 animate-pulse-slow mix-blend-multiply transition-colors duration-1000',
				theme.blob1,
			]" />
		<div
			:class="[
				'absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-40 animate-pulse-slow mix-blend-multiply transition-colors duration-1000',
				theme.blob2,
			]"
			style="animation-delay: 2s" />

		<!-- 顶部导航栏 -->
		<nav class="relative z-50 flex items-center justify-between px-6 py-6 md:px-12">
			<button
				type="button"
				class="flex items-center gap-3 cursor-pointer group text-left"
				@click="goHome">
				<div
					:class="[
						'w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12',
						theme.primary,
					]">
					<UIcon
						name="i-lucide-zap"
						class="size-5" />
				</div>
				<span :class="['text-xl font-bold tracking-tight hidden md:block', theme.primaryText]">
					石头鱼的
					<span :class="theme.accentText">工具箱</span>
				</span>
			</button>

			<!-- 调色盘 -->
			<div class="flex gap-2 bg-white/40 backdrop-blur-xl p-1.5 rounded-full border border-white/50 shadow-sm">
				<button
					v-for="t in Object.keys(themeStore.THEMES) as (keyof typeof themeStore.THEMES)[]"
					:key="t"
					type="button"
					@click="themeStore.setTheme(t)"
					:class="[
						'w-6 h-6 rounded-full transition-all duration-300',
						t === activeTheme
							? 'scale-110 ring-2 ring-offset-2 ring-gray-400/50'
							: 'hover:scale-110 opacity-70 hover:opacity-100',
					]"
					:style="{ backgroundColor: themeStore.THEMES[t].btnColor }" />
			</div>
		</nav>

		<!-- 主要内容区域 -->
		<main class="relative z-10 px-4 md:px-12 pb-12">
			<Transition
				name="view"
				mode="out-in">
				<div
					:key="route.fullPath"
					class="will-change-transform">
					<RouterView />
				</div>
			</Transition>
		</main>
	</div>
</template>

<script setup lang="ts">
	import { storeToRefs } from 'pinia'
	import { RouterView, useRoute, useRouter } from 'vue-router'

	import { useThemeStore } from '../stores/theme'

	const router = useRouter()
	const route = useRoute()
	const themeStore = useThemeStore()
	const { activeTheme, theme } = storeToRefs(themeStore)

	function goHome() {
		if (route.path !== '/') router.push('/')
	}
</script>
