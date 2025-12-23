import { createRouter, createWebHistory } from 'vue-router'

import DashboardPage from '../../pages/DashboardPage.vue'
import SvgConverterPage from '../../pages/SvgConverterPage.vue'

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', name: 'dashboard', component: DashboardPage },
		{ path: '/svg-converter', name: 'svg-converter', component: SvgConverterPage },
	],
})
