<template>
	<section class="mb-10 relative overflow-hidden rounded-[40px] bg-white border border-slate-100/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] p-10 flex flex-col md:flex-row items-center gap-12 group">
		<!-- Aurora Background -->
		<div class="absolute inset-0 bg-gradient-to-r from-teal-50/50 via-white to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
		<div class="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-teal-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse" />

		<div class="relative z-10 flex-1">
			<div class="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-600 text-xs font-bold tracking-wide uppercase">
				<UIcon
					name="i-lucide-sparkles"
					class="size-3" />
				<span>{{ heroNow }}</span>
			</div>
			<h2 class="text-4xl font-bold text-slate-800 mb-5 leading-tight tracking-tight">
				你来啦~石头鱼 <br />
				<span class="bg-gradient-to-r from-teal-500 to-blue-500 text-transparent bg-clip-text">这里是StoneKit 一个好用的小小工具箱</span>
			</h2>
			<p class="text-slate-500 text-lg leading-relaxed max-w-lg mb-8">
				StoneKit 为你准备了最纯净的工具箱。随心所欲，使用方便。
			</p>

			<div class="flex gap-4">
				<button
					class="px-6 py-3 bg-slate-800 text-white rounded-full text-sm font-bold hover:bg-slate-700 transition-all hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-slate-800/20 flex items-center gap-2"
					@click="$emit('all-tools')">
					所有工具
					<UIcon
						name="i-lucide-arrow-right"
						class="size-4" />
				</button>
				<button
					class="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-full text-sm font-bold hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
					@click="$emit('open-search')">
					搜索
				</button>
			</div>
		</div>

		<!-- Clean Graphic -->
		<div class="relative w-72 h-64 hidden md:flex items-center justify-center">
			<div class="absolute inset-0 bg-gradient-to-tr from-teal-100/30 to-indigo-100/30 rounded-full blur-2xl transform rotate-12 scale-90" />
			<div class="relative z-10 w-48 h-48 bg-white/80 backdrop-blur-xl rounded-[32px] border border-white/60 shadow-xl flex flex-col items-center justify-center gap-4 transform rotate-6 group-hover:rotate-3 transition-transform duration-700">
				<div class="w-16 h-16 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
					<UIcon
						name="i-lucide-zap"
						class="size-8" />
				</div>
				<div class="space-y-2 w-full px-8">
					<div class="h-2 bg-slate-100 rounded-full w-full" />
					<div class="h-2 bg-slate-100 rounded-full w-2/3" />
				</div>
			</div>
			<div class="absolute -bottom-4 -left-4 z-20 px-4 py-3 bg-white rounded-2xl shadow-lg border border-slate-50 flex items-center gap-3 transform -rotate-3 group-hover:rotate-0 transition-transform duration-700 delay-100">
				<div class="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
				<span class="text-xs font-bold text-slate-600">All Systems Go</span>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	type Props = {
		heroNow: string
		toolsCount: number
	}

	defineProps<Props>()

	defineEmits<{
		(event: 'all-tools'): void
		(event: 'open-search'): void
	}>()

	defineOptions({
		name: 'DashboardHeroSection',
	})
</script>
