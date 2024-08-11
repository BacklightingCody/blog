import 'virtual:uno.css' //引入unocss样式
import 'animate.css' // 引入animate.css动画库
import '@/sass/main.scss' // 引入全局样式
import { createApp } from 'vue'
import { pinia } from './stores'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
