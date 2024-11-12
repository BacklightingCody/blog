<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'IconParkTwotonePot',
});
</script>
<template>
	<svg xmlns="http://www.w3.org/2000/svg" width="5rem" height="5rem" viewBox="0 0 48 48">
		<defs>
			<mask id="ipTPot0">
				<g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4">
					<path d="m34 28l10-4" />
					<path fill="#555" d="M4 28h30l-.439 3.802A7 7 0 0 1 26.607 38H11.393a7 7 0 0 1-6.954-6.198z" />
					<path d="M19 10v10m-8-8v6m16-6v6" />
				</g>
			</mask>
		</defs>
		<path fill="#FE6C05" d="M0 0h48v48H0z" mask="url(#ipTPot0)" />
	</svg>
</template>
