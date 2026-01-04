<template>
	<div
		class="flex gap-1.5 p-1 bg-linear-to-r from-slate-50 via-slate-100 to-slate-50 rounded-full w-full shadow-inner border border-slate-200/50">
		<button
			:class="[
				'flex-1 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden',
				modelValue === 'paste'
					? 'bg-linear-to-br from-teal-400/90 to-emerald-400/90 backdrop-blur-sm text-white shadow-md shadow-teal-500/25 ring-1 ring-white/40 scale-[1.01]'
					: 'text-slate-500 hover:text-slate-700 hover:bg-white/40',
			]"
			@click="handleClick('paste')">
			<UIcon
				name="i-lucide-code"
				class="size-4 relative z-10" />
			<span class="relative z-10">粘贴代码</span>
		</button>
		<button
			:class="[
				'flex-1 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden',
				modelValue === 'upload'
					? 'bg-linear-to-br from-teal-400/90 to-emerald-400/90 backdrop-blur-sm text-white shadow-md shadow-teal-500/25 ring-1 ring-white/40 scale-[1.01]'
					: 'text-slate-500 hover:text-slate-700 hover:bg-white/40',
			]"
			@click="handleClick('upload')">
			<UIcon
				name="i-lucide-upload"
				class="size-4 relative z-10" />
			<span class="relative z-10">上传文件</span>
		</button>
	</div>
</template>

<script setup lang="ts">
	export type InputMode = 'paste' | 'upload'

	type Props = {
		modelValue: InputMode
	}

	type Emits = {
		(e: 'update:modelValue', value: InputMode): void
	}

	const props = defineProps<Props>()
	const emit = defineEmits<Emits>()

	const handleClick = (mode: InputMode) => {
		emit('update:modelValue', mode)
	}
</script>
