<template>
	<UCard
		:ui="{
			root: 'bg-white rounded-3xl border border-slate-100/80 shadow-sm flex flex-col divide-y-0',
			header: 'px-6 py-4 border-b border-slate-100',
			body: 'p-6 flex-1',
			footer: 'px-6 py-4 border-t border-slate-100',
		}">
		<template #header>
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<div class="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center">
						<UIcon
							name="i-lucide-check-circle-2"
							class="size-4 text-emerald-600" />
					</div>
					<div>
						<div class="text-sm font-semibold text-slate-700">Base64 输出</div>
						<div class="text-xs text-slate-500 mt-0.5">
							{{ loading ? '生成中…' : dataUrl ? '有效 SVG' : '暂无输出' }}
						</div>
					</div>
				</div>
				<div
					v-if="dataUrl"
					class="px-3 py-1 rounded-full bg-slate-50 text-xs font-mono text-slate-600">
					~{{ Math.round((dataUrl.length / 1024) * 10) / 10 }} KB
				</div>
			</div>
		</template>

		<UTextarea
			:model-value="dataUrl"
			readonly
			:rows="8"
			placeholder="输出会出现在这里…"
			:ui="{
				root: 'flex-1',
				base: 'font-mono text-xs resize-none',
				wrapper: 'h-full',
			}" />

		<template #footer>
			<div class="flex flex-col gap-3 sm:flex-row">
				<UButton
					:disabled="!dataUrl"
					:loading="loading"
					color="primary"
					class="sm:flex-1 rounded-xl"
					@click="() => handleCopy('url')">
					<UIcon
						v-if="copyStatus === 'url'"
						name="i-lucide-check"
						class="size-4" />
					<UIcon
						v-else
						name="i-lucide-copy"
						class="size-4" />
					复制 Base64 字符串
				</UButton>

				<UButton
					:disabled="!dataUrl"
					variant="outline"
					color="gray"
					class="rounded-xl"
					@click="() => handleCopy('css')">
					<UIcon
						v-if="copyStatus === 'css'"
						name="i-lucide-check"
						class="size-4" />
					<span v-else>CSS 复制为 CSS 背景</span>
				</UButton>
			</div>
		</template>
	</UCard>
</template>

<script setup lang="ts">
	import { useBase64Copy } from '../composables/useBase64Copy'

	type Props = {
		dataUrl: string
		loading: boolean
	}

	const props = defineProps<Props>()

	const { copyStatus, copy } = useBase64Copy()

	const handleCopy = async (format: 'url' | 'css') => {
		await copy(props.dataUrl, format)
	}
</script>
