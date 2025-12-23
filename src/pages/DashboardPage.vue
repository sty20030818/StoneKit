<template>
	<div class="max-w-6xl mx-auto animate-in-zoom">
		<!-- Header -->
		<header class="mb-12 mt-4 text-center md:text-left">
			<h1 :class="['text-5xl md:text-7xl font-extrabold mb-4 tracking-tight', theme.primaryText]">
				嘿，
				<span class="relative inline-block">
					石头鱼
					<svg
						:class="['absolute w-full h-3 -bottom-1 left-0 opacity-40', theme.accentText]"
						viewBox="0 0 100 10"
						preserveAspectRatio="none">
						<path
							d="M0 5 Q 50 10 100 5"
							stroke="currentColor"
							stroke-width="8"
							fill="none" />
					</svg>
				</span>
			</h1>
			<p :class="['text-lg md:text-xl opacity-70 font-medium max-w-2xl', theme.primaryText]">
				这里是你的数字军火库。所有的轮子，都为你打磨好了。(Vue Edition)
			</p>

			<!-- 伪搜索框 -->
			<div class="mt-8 relative max-w-lg hidden md:block group">
				<div
					:class="[
						'absolute inset-0 bg-linear-to-r rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity',
						theme.gradient,
					]" />
				<div
					class="relative flex items-center bg-white/60 backdrop-blur-xl border border-white/60 rounded-full px-6 py-4 shadow-sm transition-all focus-within:shadow-md focus-within:scale-[1.02]">
					<UIcon
						:class="['size-5 mr-3 opacity-50', theme.accentText]"
						name="i-lucide-search" />
					<input
						type="text"
						placeholder="搜索工具 (例如: SVG, 正则, 阴影...)"
						class="bg-transparent border-none outline-none w-full text-gray-700 placeholder-gray-500 font-medium" />
				</div>
			</div>
		</header>

		<!-- Bento Grid -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
			<!-- SVG Converter (Main) -->
			<button
				type="button"
				@click="goSvgConverter"
				class="md:col-span-2 row-span-2 rounded-[32px] p-8 bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl cursor-pointer group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 text-left">
				<div
					:class="[
						'absolute top-0 right-0 w-64 h-64 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 transition-all group-hover:scale-125',
						theme.primaryLight,
					]" />

				<div class="relative z-10 h-full flex flex-col justify-between">
					<div>
						<div
							:class="[
								'w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:rotate-12 transition-transform duration-300',
								theme.primary,
							]">
							<UIcon
								name="i-lucide-code"
								class="size-7" />
						</div>
						<h3 :class="['text-3xl font-bold mb-2', theme.primaryText]">SVG 转 Base64</h3>
						<p :class="['opacity-60 font-medium', theme.primaryText]">
							前端必修课。拖拽上传，即刻转换，支持 CSS 背景图格式。
						</p>
					</div>

					<div
						class="flex items-center gap-2 font-bold text-sm uppercase tracking-wider opacity-40 group-hover:opacity-100 transition-opacity">
						<span>立即开始</span>
						<UIcon
							name="i-lucide-arrow-left"
							class="size-4 rotate-180" />
					</div>
				</div>
			</button>

			<!-- Placeholder 1 -->
			<div
				class="rounded-[32px] p-6 bg-white/40 backdrop-blur-md border border-white/40 hover:bg-white/60 transition-all cursor-not-allowed group relative overflow-hidden">
				<div class="absolute inset-0 bg-linear-to-br from-white/10 to-transparent pointer-events-none" />
				<div class="h-full flex flex-col justify-between opacity-50 group-hover:opacity-80 transition-opacity">
					<div :class="['w-10 h-10 rounded-xl bg-gray-200/50 flex items-center justify-center', theme.accentText]">
						<UIcon
							name="i-lucide-sparkles"
							class="size-5" />
					</div>
					<div>
						<h3 :class="['text-xl font-bold', theme.primaryText]">拟态生成器</h3>
						<p class="text-xs font-medium text-gray-500 mt-1">开发中...</p>
					</div>
				</div>
			</div>

			<!-- Placeholder 2 -->
			<div
				class="rounded-[32px] p-6 bg-gray-900/5 backdrop-blur-md border border-white/20 hover:bg-white/60 transition-all cursor-not-allowed group opacity-60 hover:opacity-100">
				<div class="h-full flex flex-col justify-between">
					<div :class="['w-10 h-10 rounded-xl bg-gray-200/50 flex items-center justify-center', theme.accentText]">
						<UIcon
							name="i-lucide-cpu"
							class="size-5" />
					</div>
					<div>
						<h3 :class="['text-xl font-bold', theme.primaryText]">正则可视化</h3>
						<p class="text-xs font-medium text-gray-500 mt-1">Coming Soon</p>
					</div>
				</div>
			</div>

			<!-- Placeholder 3 -->
			<div
				class="md:col-span-1 rounded-[32px] p-6 bg-linear-to-br from-white/60 to-white/30 backdrop-blur-xl border border-white/50 hover:shadow-lg transition-all cursor-not-allowed group">
				<div class="h-full flex flex-col justify-between opacity-50">
					<div :class="['w-10 h-10 rounded-xl bg-gray-200/50 flex items-center justify-center', theme.accentText]">
						<UIcon
							name="i-lucide-image"
							class="size-5" />
					</div>
					<div>
						<h3 :class="['text-xl font-bold', theme.primaryText]">像素压缩机</h3>
						<p class="text-xs font-medium text-gray-500 mt-1">WASM 驱动</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { storeToRefs } from 'pinia'
	import { useRouter } from 'vue-router'

	import { useThemeStore } from '../app/stores/theme'

	const router = useRouter()
	const themeStore = useThemeStore()
	const { theme } = storeToRefs(themeStore)

	function goSvgConverter() {
		router.push('/svg-converter')
	}
</script>
