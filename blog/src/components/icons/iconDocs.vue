<script setup lang="ts">
import { defineComponent } from 'vue'

defineComponent({
  name: 'LineMdDocument',
})
</script>
<template>
	<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
		<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
			<path stroke-dasharray="64" stroke-dashoffset="64" stroke-width="2" d="M13 3L19 9V21H5V3H13">
				<animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0" />
			</path>
			<path stroke-dasharray="14" stroke-dashoffset="14" d="M12.5 3V8.5H19">
				<animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="14;0" />
			</path>
		</g>
	</svg>
</template>
