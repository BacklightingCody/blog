<template>
  <div class="relative w-full max-w-2xl">
    <!-- 卡片内容 -->
    <div ref="cardRef" class="bg-opacity-90 rounded-lg shadow-2xl overflow-hidden"
      :style="{ backgroundColor: bgColor }">
      <!-- 图片部分 -->
      <div class="relative h-48 overflow-hidden">
        <img :src="image" alt="Article Image" class="w-full! h-48! object-cover object-center m-0! translate-x-0!" />
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-24"></div>
      </div>

      <!-- 文字内容部分 -->
      <div class="p-6 relative">
        <h2 class="text-2xl font-bold mb-2 leading-tight" :style="{ color: textColor }">{{ title }}</h2>
        <p class="text-sm mb-4 opacity-75" :style="{ color: textColor }">
          <span class="mr-2">{{ author }}</span>
          <span>{{ publishDate }}</span>
        </p>
        <p class="text-base mb-4 leading-relaxed" :style="{ color: textColor }">{{ excerpt }}</p>
      </div>

      <!-- Footer部分 -->
      <div class="p-4 bg-gray-800 text-white text-center text-sm">
        {{ footer }}
      </div>
    </div>

    <!-- 颜色选择器和导出按钮 -->
    <div class="absolute top-2 right-2 flex space-x-2">
      <input type="color" v-model="textColor" class="w-8 h-8 rounded cursor-pointer" title="文字颜色" />
      <input type="color" v-model="bgColor" class="w-8 h-8 rounded cursor-pointer" title="背景颜色" />
      <button @click="exportCard"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
        导出
      </button>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from "vue";
import { toPng } from "html-to-image";

// 接收父组件传递的参数
const props = defineProps({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishDate: { type: String, required: true },
  excerpt: { type: String, required: true },
  image: { type: String, required: true,default: "/picture/urbanHuman/human4.jpg" },
  footer: { type: String, default: "backlighting.cn" }, // 默认值为一个示例地址
});

// 用于引用卡片的 DOM 节点
const cardRef = ref(null);

// 颜色状态
const textColor = ref("#ffffff");
const bgColor = ref("#1a202c");

// 导出卡片为图片
const exportCard = () => {
  if (cardRef.value) {
    toPng(cardRef.value)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${props.title}.png`;
        link.click();
      })
      .catch((error) => {
        console.error("导出失败:", error);
      });
  }
};
</script>

<style scoped>
/*@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&family=Noto+Serif+SC&display=swap');*/

* {
  font-family: 'Noto Sans SC', sans-serif;
}

input[type="color"] {
  -webkit-appearance: none;
  border: none;
}

input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}

input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 4px;
}
</style>