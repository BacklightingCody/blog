<template>
  <div class="color-picker flex ">
    <div class="controls">
      <!-- 颜色滑块 -->
      <div class="slider">
        <label>Red: {{ color.r }}</label>
        <input type="range" min="0" max="255" v-model="color.r" />
      </div>
      <div class="slider">
        <label>Green: {{ color.g }}</label>
        <input type="range" min="0" max="255" v-model="color.g" />
      </div>
      <div class="slider">
        <label>Blue: {{ color.b }}</label>
        <input type="range" min="0" max="255" v-model="color.b" />
      </div>
      <div class="slider" v-if="isOpacity">
        <label>Opacity: {{ color.a }}</label>
        <input type="range" min="0" max="1" step="0.01" v-model="color.a" value="0.7" />
      </div>
    </div>

    <div class="preview" :style="previewStyle">
      <span>bg Color</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue';
import { modifyCurColor, parseRGBA } from '@/utils/color';
import { useGlobalStore } from '@/stores';
const globalStore = useGlobalStore()
const props = defineProps({
  isOpacity: {
    type: Boolean,
    default: false,
  },
});
// 颜色对象
const color = reactive({
  r: 0,
  g: 0,
  b: 0,
  a: 0.7,
});
const updateColorFromGlobalStore = () => {
  const parsedColor = parseRGBA(globalStore.curColor);
  color.r = parsedColor.r;
  color.g = parsedColor.g;
  color.b = parsedColor.b;
  color.a = parsedColor.a;

};

// 初始化同步颜色
updateColorFromGlobalStore();

// 计算 RGB 或 RGBA 值
const rgba = computed(() => `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`);
const rgb = computed(() => `rgb(${color.r}, ${color.g}, ${color.b})`);


// 预览样式
const previewStyle = computed(() => ({
  backgroundColor: rgba.value,
}));

// 监听颜色变化并调用 modifyCurColor
watch(rgba, (newValue) => {
  modifyCurColor(newValue);
  globalStore.curColor = newValue;
});
watch(() => globalStore.curColor, (newValue) => {
  updateColorFromGlobalStore();
})
</script>

<style scoped>
.color-picker {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  font-family: Arial, sans-serif;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.slider {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
}

.preview {
  width: 150px;
  height: 150px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
}

.output {
  text-align: center;
  font-size: 14px;
}
</style>
