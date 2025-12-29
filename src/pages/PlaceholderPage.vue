<template>
	<PageLayout>
		<template #header>
			<div class="flex items-center gap-3">
				<UButton
					variant="ghost"
					icon="i-lucide-arrow-left"
					@click="router.push('/')">
					返回
				</UButton>
				<div class="text-lg font-semibold">功能开发中</div>
			</div>
		</template>
		<EmptyState
			icon="i-lucide-construction"
			title="功能开发中"
			description="这个工具正在开发中，敬请期待～" />
	</PageLayout>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router'
	import PageLayout from '../shared/components/PageLayout.vue'
	import EmptyState from '../shared/components/EmptyState.vue'

	const router = useRouter()
</script>
