<template>
	<!-- 输出区域岛屿 -->
	<div
		class="bg-linear-to-br from-emerald-50/60 to-teal-50/60 backdrop-blur-xl rounded-[20px] border border-emerald-100/60 shadow-md shadow-emerald-500/5 p-4">
		<div class="flex items-center justify-between">
			<!-- 左侧：统计信息 -->
			<div class="flex items-center gap-4">
				<div class="flex items-center gap-2">
					<UIcon
						name="i-lucide-check-circle"
						class="size-4 text-emerald-500" />
					<span class="text-sm text-slate-600">
						<span class="font-bold text-slate-700">{{ completedCount }}</span>
						已完成
					</span>
				</div>

				<div
					v-if="totalSaved > 0"
					class="flex items-center gap-2">
					<UIcon
						name="i-lucide-hard-drive"
						class="size-4 text-teal-500" />
					<span class="text-sm text-slate-600">
						节省
						<span class="font-bold text-teal-600">{{ formatSize(totalSaved) }}</span>
					</span>
				</div>

				<div
					v-if="avgSavings > 0"
					class="flex items-center gap-2">
					<UBadge
						variant="soft"
						color="emerald">
						-{{ avgSavings }}%
					</UBadge>
				</div>
			</div>

			<!-- 右侧：下载按钮 -->
			<UButton
				v-if="completedCount > 0"
				variant="soft"
				color="emerald"
				icon="i-lucide-download"
				size="sm"
				class="rounded-full"
				@click="emit('download-all')">
				下载全部
			</UButton>
		</div>
	</div>
</template>

<script setup lang="ts">
	defineProps<{
		completedCount: number
		totalSaved: number
		avgSavings: number
	}>()

	const emit = defineEmits<{
		(e: 'download-all'): void
	}>()

	const formatSize = (bytes: number): string => {
		if (bytes === 0) return '0 B'
		if (bytes < 0) return '-' + formatSize(-bytes)
		const k = 1024
		const sizes = ['B', 'KB', 'MB', 'GB']
		const i = Math.floor(Math.log(bytes) / Math.log(k))
		return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
	}
</script>
