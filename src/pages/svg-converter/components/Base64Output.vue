<template>
	<UCard
		:ui="{
			root: 'bg-gradient-to-br from-teal-500 to-emerald-500 rounded-3xl border-0 shadow-lg h-full flex flex-col divide-y-0',
			header: 'px-6 py-4 border-b border-white/20 shrink-0',
			body: 'px-6 pt-6 flex-1 min-h-0 flex flex-col',
			footer: 'px-6 pb-4 shrink-0',
		}">
		<template #header>
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<div class="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
						<UIcon
							name="i-lucide-check-circle-2"
							class="size-4 text-white" />
					</div>
					<div>
						<div class="text-sm font-semibold text-white">Base64 输出</div>
						<div class="text-xs text-white/80 mt-0.5">
							{{ loading ? '生成中…' : dataUrl ? '有效 SVG' : '暂无输出' }}
						</div>
					</div>
				</div>
				<div
					v-if="dataUrl"
					class="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-mono text-white">
					~{{ Math.round((dataUrl.length / 1024) * 10) / 10 }} KB
				</div>
			</div>
		</template>

		<UTextarea
			:model-value="dataUrl"
			readonly
			:rows="6"
			placeholder="输出会出现在这里…"
			:ui="{
				root: 'w-full flex-1 min-h-0',
				base: 'font-mono text-sm resize-none w-full h-full border-0 bg-white/10 backdrop-blur-sm rounded-2xl px-4 pt-3 text-white placeholder:text-white/50 focus:bg-white/20 focus:ring-2 focus:ring-white/30 transition-all duration-200',
				wrapper: 'w-full h-full',
			}" />

		<template #footer>
			<div class="flex gap-1.5 p-1.5 bg-white/10 backdrop-blur-sm rounded-full">
				<button
					:disabled="!dataUrl || loading"
					:class="[
						'flex-1 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed',
						copyStatus === 'url'
							? 'bg-white text-teal-600 shadow-lg shadow-white/30 ring-2 ring-white/50'
							: 'bg-white/90 text-teal-600 shadow-md shadow-white/20 hover:bg-white hover:shadow-lg hover:shadow-white/30',
					]"
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
				</button>

				<button
					:disabled="!dataUrl"
					:class="[
						'px-5 py-3 rounded-full text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed',
						copyStatus === 'css'
							? 'bg-white text-teal-600 shadow-lg shadow-white/30 ring-2 ring-white/50'
							: 'bg-white/60 text-white shadow-sm hover:bg-white/80 hover:shadow-md',
					]"
					@click="() => handleCopy('css')">
					<UIcon
						v-if="copyStatus === 'css'"
						name="i-lucide-check"
						class="size-4" />
					<span v-else>CSS</span>
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
