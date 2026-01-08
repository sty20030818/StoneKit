import { createApp } from 'vue'
import ui from '@nuxt/ui/vue-plugin'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { addCollection } from '@iconify/vue'
import { icons as lucideIcons } from '@iconify-json/lucide'

import App from './App.vue'
import { router } from './router'

import './styles/main.css'

// 加载本地图标数据集，确保离线环境也能使用图标
addCollection(lucideIcons)

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(router)
app.use(pinia)
app.use(ui)

app.mount('#app')
