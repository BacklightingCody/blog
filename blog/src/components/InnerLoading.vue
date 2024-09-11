<template>
  <div class="inner-loading">
    <video width="60" ref="loading" loop>
      <source src="/loading.webm" type="video/webm">
    </video>
  </div>
</template>
<script setup lang="ts">

import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import { watch } from 'vue'
import { useGlobalStore } from '@/stores'
import { useTemplateRef } from 'vue';
const globalStore = useGlobalStore()
const loadingRef = useTemplateRef<HTMLVideoElement | null>('loading')
onMounted(() => {

  loadingRef ? loadingRef.value.play() : '';
});
</script>
<style lang="scss" scoped></style>
