import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import ui from '@nuxt/ui/vite'
import Icons from 'unplugin-icons/vite'
import path from 'path'

import { uiConfig } from './src/config/ui.config'

const host = process.env.TAURI_DEV_HOST

export default defineConfig(async () => ({
	resolve: {
		// 路径别名配置：使用 @ 指向 src 目录
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	plugins: [
		vue(),
		tailwindcss(),
		ui(uiConfig),
		Icons({
			compiler: 'vue3',
			autoInstall: false,
		}),
	],

	// Tauri 开发配置：仅在 `tauri dev` 或 `tauri build` 时应用
	//
	// 1. 防止 Vite 遮蔽 Rust 错误信息
	clearScreen: false,
	// 2. Tauri 需要固定端口，如果端口不可用则失败
	server: {
		port: 1420,
		strictPort: true,
		host: host || false,
		hmr: host
			? {
					protocol: 'ws',
					host,
					port: 5174,
				}
			: undefined,
		watch: {
			// 3. 告诉 Vite 忽略监听 `src-tauri` 目录
			ignored: ['**/src-tauri/**'],
		},
	},
}))
