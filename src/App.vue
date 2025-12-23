<script setup lang="ts">
	import SvgToBase64 from './features/svg-base64/components/SvgToBase64.vue'
</script>

<template>
	<UApp>
		<div class="isolate">
			<SvgToBase64 />
		</div>
		<UToaster />
	</UApp>
</template>
