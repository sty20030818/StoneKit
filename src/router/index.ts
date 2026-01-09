import { createRouter, createWebHistory } from 'vue-router'

import DashboardPage from '@/pages/dashboard/index.vue'
import SvgConverterPage from '@/pages/svg-converter/index.vue'
import ToolsPage from '@/pages/ToolsPage.vue'
import ImageCompressorPage from '@/pages/image-compressor/index.vue'
import PlaceholderPage from '@/pages/PlaceholderPage.vue'

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', name: 'dashboard', component: DashboardPage },
		{ path: '/tools', name: 'tools', component: ToolsPage },
		{ path: '/svg-converter', name: 'svg-converter', component: SvgConverterPage },
		{ path: '/image-compress', name: 'image-compress', component: ImageCompressorPage },

		// 占位路由：用于未实现的工具页面，避免路由警告
		{ path: '/json-format', name: 'json-format', component: PlaceholderPage },
		{ path: '/base64-encoder', name: 'base64-encoder', component: PlaceholderPage },
		{ path: '/regex-tester', name: 'regex-tester', component: PlaceholderPage },
		{ path: '/css-generator', name: 'css-generator', component: PlaceholderPage },
		{ path: '/color-extract', name: 'color-extract', component: PlaceholderPage },
		{ path: '/md5-hash', name: 'md5-hash', component: PlaceholderPage },
	],
})
