<template>
  <img
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    loading="lazy"
    style="max-width: 100%;"
  />
</template>

<script setup lang="ts">
defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  width: { type: [String, Number], default: 'auto' },
  height: { type: [String, Number], default: 'auto' },
});
</script>
