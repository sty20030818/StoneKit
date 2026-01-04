<template>
	<UCard
		:ui="{
			root: 'bg-white/70 backdrop-blur-xl rounded-3xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-white/50 h-full flex flex-col divide-y-0 transition-all hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)]',
			header: 'px-6 pt-3 border-b border-white/40 shrink-0',
			body: 'px-6 flex-1 min-h-0 flex flex-col',
			footer: 'px-6 pt-2 pb-4 shrink-0',
		}">
		<template #header>
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<div class="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center">
						<UIcon
							name="i-lucide-code-2"
							class="size-4 text-teal-600" />
					</div>
					<div class="text-sm font-semibold text-slate-700">Base64 输出</div>
				</div>
				<div class="flex items-center gap-2">
					<div
						:class="[
							'px-3 py-1 rounded-full text-xs font-medium transition-colors',
							loading
								? 'bg-amber-50 text-amber-700'
								: dataUrl
									? 'bg-teal-50 text-teal-700'
									: 'bg-slate-100 text-slate-500',
						]">
						{{ loading ? '生成中…' : dataUrl ? '就绪' : '等待输入' }}
					</div>
					<div
						v-if="dataUrl && !loading"
						class="px-3 py-1 rounded-full bg-slate-50 text-xs font-mono text-slate-600">
						{{ Math.round((dataUrl.length / 1024) * 10) / 10 }} KB
					</div>
				</div>
			</div>
		</template>

		<div
			:class="[
				'w-full rounded-xl border-2 transition-all duration-200 overflow-hidden relative group flex-1 min-h-0 flex items-start justify-center',
				dataUrl && !loading
					? 'border-slate-200 bg-slate-50/50 hover:border-teal-300 hover:bg-teal-50/50 cursor-pointer'
					: 'border-slate-200 bg-slate-50/30 cursor-default',
			]"
			@click="() => dataUrl && !loading && handleCopy('url')">
			<div
				:class="[
					'font-mono text-xs whitespace-pre-wrap wrap-break-word select-text w-full px-4 pt-2 pb-4 text-left',
					dataUrl ? 'text-slate-700' : 'text-slate-400',
				]">
				{{ dataUrl || '输出会出现在这里…' }}
			</div>

			<!-- Hover 遮罩 -->
			<div
				v-if="dataUrl && !loading && copyStatus !== 'url'"
				class="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
				<div class="text-slate-700 text-sm font-medium flex items-center gap-2">
					<UIcon
						name="i-lucide-copy"
						class="size-4" />
					点击复制
				</div>
			</div>

			<!-- 复制成功动画 -->
			<Transition name="copy-success">
				<div
					v-if="copyStatus === 'url'"
					class="absolute inset-0 bg-teal-50/95 backdrop-blur-sm rounded-xl flex items-center justify-center pointer-events-none border-2 border-teal-300">
					<div class="text-teal-700 flex items-center gap-2">
						<UIcon
							name="i-lucide-check-circle-2"
							class="size-5" />
						<span class="text-sm font-semibold">已复制</span>
					</div>
				</div>
			</Transition>

			<!-- Loading 状态 -->
			<div
				v-if="loading"
				class="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center pointer-events-none">
				<div class="text-slate-500 flex items-center gap-2">
					<UIcon
						name="i-lucide-loader-2"
						class="size-5 animate-spin" />
					<span class="text-sm font-medium">正在生成…</span>
				</div>
			</div>
		</div>

		<template #footer>
			<div class="flex gap-2.5">
				<button
					:disabled="!dataUrl || loading"
					:class="[
						'flex-1 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group',
						copyStatus === 'url'
							? 'bg-linear-to-br from-teal-600 via-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/40 ring-2 ring-teal-400/30 scale-[1.02]'
							: 'bg-linear-to-br from-teal-400 to-emerald-400 text-white shadow-md shadow-teal-500/30 hover:from-teal-500 hover:to-emerald-500 hover:shadow-lg hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98]',
					]"
					@click="() => handleCopy('url')">
					<UIcon
						v-if="copyStatus === 'url'"
						name="i-lucide-check"
						class="size-4 relative z-10" />
					<UIcon
						v-else
						name="i-lucide-copy"
						class="size-4 relative z-10 transition-transform group-hover:scale-110" />
					<span class="relative z-10">复制 Base64</span>
					<div
						v-if="copyStatus === 'url'"
						class="absolute inset-0 bg-linear-to-r from-white/20 via-transparent to-white/20 pointer-events-none animate-pulse" />
				</button>

				<button
					:disabled="!dataUrl || loading"
					:class="[
						'px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group border-2',
						copyStatus === 'css'
							? 'bg-linear-to-br from-teal-50 to-teal-100 text-teal-700 border-teal-300 ring-2 ring-teal-200/50 shadow-md shadow-teal-200/30 scale-[1.02]'
							: 'bg-white text-slate-600 border-slate-200 hover:bg-linear-to-br hover:from-slate-50 hover:to-white hover:border-slate-300 hover:shadow-md hover:shadow-slate-200/30 hover:scale-[1.02] active:scale-[0.98]',
					]"
					@click="() => handleCopy('css')">
					<UIcon
						v-if="copyStatus === 'css'"
						name="i-lucide-check"
						class="size-4 relative z-10" />
					<span
						v-else
						class="relative z-10 font-medium">
						CSS
					</span>
					<div
						v-if="copyStatus === 'css'"
						class="absolute inset-0 bg-linear-to-r from-teal-200/20 via-transparent to-teal-200/20 pointer-events-none" />
				</button>
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

<style scoped>
	.copy-success-enter-active,
	.copy-success-leave-active {
		transition: all 0.2s ease;
	}

	.copy-success-enter-from {
		opacity: 0;
		transform: scale(0.8);
	}

	.copy-success-enter-to {
		opacity: 1;
		transform: scale(1);
	}

	.copy-success-leave-from {
		opacity: 1;
		transform: scale(1);
	}

	.copy-success-leave-to {
		opacity: 0;
		transform: scale(0.8);
	}
</style>
