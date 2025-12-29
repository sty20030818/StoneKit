<template>
	<div class="rounded-[24px] border border-slate-100/80 bg-white/60 p-4 shadow-sm">
		<div class="mb-4 flex items-start justify-between">
			<div class="flex items-center gap-3">
				<USkeleton class="h-12 w-12 rounded-2xl" />
				<div class="space-y-2">
					<USkeleton class="h-4 w-28" />
					<USkeleton class="h-3 w-36" />
				</div>
			</div>
			<USkeleton class="h-8 w-8 rounded-full" />
		</div>
		<USkeleton class="h-3 w-full" />
		<USkeleton class="mt-2 h-3 w-3/4" />
	</div>
</template>

<script setup lang="ts">
	defineOptions({
		name: 'ToolCardSkeleton',
	})
</script>
