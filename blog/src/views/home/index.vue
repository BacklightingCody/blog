<template>
  <div class="nav"></div>
</template>
<script setup lang="ts">

</script>
<style lang="scss" scoped>
.nav {
  width: 300px;
  height: 200px;
  background-color: var(--bg-color);
  position: relative;
  overflow: hidden;

}

.nav::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, var(--btn-color) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: transform 0.3s ease, opacity 0.3s ease;
  opacity: 0;
  pointer-events: none;
}

.nav:hover::before {
  transform: translate(-50%, -50%) scale(0.5);
  opacity: 1;
}
</style>
