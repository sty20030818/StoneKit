<template>
	<div
		class="flex gap-1.5 p-1 bg-linear-to-r from-slate-50 via-slate-100 to-slate-50 rounded-full w-full shadow-inner border border-slate-200/50">
		<button
			:class="[
				'flex-1 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden',
				modelValue === 'paste'
					? 'bg-linear-to-br from-teal-400 via-teal-500 to-emerald-400 text-white shadow-lg shadow-teal-500/40 ring-2 ring-teal-300/60 scale-[1.02]'
					: 'text-slate-500 hover:text-slate-700 hover:bg-white/50',
			]"
			@click="handleClick('paste')">
			<UIcon
				name="i-lucide-code"
				:class="[
					'size-4 transition-transform duration-300 relative z-10',
					modelValue === 'paste' ? 'scale-110' : '',
				]" />
			<span class="relative z-10">粘贴代码</span>
			<!-- 光泽高光层 -->
			<div
				v-if="modelValue === 'paste'"
				class="absolute inset-0 bg-linear-to-br from-white/30 via-white/10 to-transparent pointer-events-none rounded-full" />
			<!-- 底部阴影增强 -->
			<div
				v-if="modelValue === 'paste'"
				class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-teal-500/20 blur-md rounded-full pointer-events-none" />
		</button>
		<button
			:class="[
				'flex-1 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden',
				modelValue === 'upload'
					? 'bg-linear-to-br from-teal-400 via-teal-500 to-emerald-400 text-white shadow-lg shadow-teal-500/40 ring-2 ring-teal-300/60 scale-[1.02]'
					: 'text-slate-500 hover:text-slate-700 hover:bg-white/50',
			]"
			@click="handleClick('upload')">
			<UIcon
				name="i-lucide-upload"
				:class="[
					'size-4 transition-transform duration-300 relative z-10',
					modelValue === 'upload' ? 'scale-110' : '',
				]" />
			<span class="relative z-10">上传文件</span>
			<!-- 光泽高光层 -->
			<div
				v-if="modelValue === 'upload'"
				class="absolute inset-0 bg-linear-to-br from-white/30 via-white/10 to-transparent pointer-events-none rounded-full" />
			<!-- 底部阴影增强 -->
			<div
				v-if="modelValue === 'upload'"
				class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-teal-500/20 blur-md rounded-full pointer-events-none" />
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
