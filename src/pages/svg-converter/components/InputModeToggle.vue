<template>
	<div class="flex gap-1.5 p-1.5 bg-linear-to-r from-teal-500 to-emerald-500 rounded-full w-full shadow-lg">
		<button
			:class="[
				'flex-1 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2',
				modelValue === 'paste'
					? 'bg-white text-teal-600 shadow-lg shadow-white/30 ring-2 ring-white/50'
					: 'text-white hover:bg-white/20',
			]"
			@click="handleClick('paste')">
			<UIcon
				name="i-lucide-code"
				class="size-4" />
			粘贴代码
		</button>
		<button
			:class="[
				'flex-1 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2',
				modelValue === 'upload'
					? 'bg-white text-teal-600 shadow-lg shadow-white/30 ring-2 ring-white/50'
					: 'text-white hover:bg-white/20',
			]"
			@click="handleClick('upload')">
			<UIcon
				name="i-lucide-upload"
				class="size-4" />
			上传文件
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
