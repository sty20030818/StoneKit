<template>
	<section class="mb-12 flex items-center min-h-[320px]">
		<div class="flex w-full flex-col items-center justify-between gap-12 px-8 py-8 md:flex-row md:px-16">
			<div class="max-w-xl">
				<div class="mb-4 flex items-center gap-2">
					<span>{{ heroNow }}</span>
				</div>

				<h2 class="mb-4 text-4xl md:text-5xl">今天想做点什么？</h2>

				<p class="text-lg">StoneKit 把编码、格式化、设计与安全工具都放在一处，随用随开。</p>

				<div class="mt-7 flex flex-col gap-3 sm:flex-row">
					<UButton @click="$emit('all-tools')">
						<UIcon name="i-lucide-layout-grid" />
						<span>所有工具</span>
						<span>({{ toolsCount }})</span>
					</UButton>

					<UButton @click="$emit('open-search')">
						<UIcon name="i-lucide-search" />
						<span>搜索</span>
					</UButton>
				</div>
			</div>

			<div class="w-full shrink-0 md:w-auto">
				<slot name="preview" />
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
	interface Props {
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
