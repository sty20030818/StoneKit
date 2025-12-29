import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import ui from '@nuxt/ui/vite'
import Icons from 'unplugin-icons/vite'

const host = process.env.TAURI_DEV_HOST

// https://vite.dev/config/
export default defineConfig(async () => ({
	plugins: [
		vue(),
		tailwindcss(),
		ui({
			colors: {
				primary: {
					50: '#f0fdfa',
					100: '#ccfbf1',
					200: '#99f6e4',
					300: '#5eead4',
					400: '#2dd4bf',
					500: '#14b8a6',
					600: '#0d9488',
					700: '#0f766e',
					800: '#115e59',
					900: '#134e4a',
					950: '#042f2e',
				},
			},
			ui: {
				// 统一「圆润 + 材质感」：尽量通过 Nuxt UI 全局 slots 覆盖实现
				card: {
					slots: {
						root: 'rounded-3xl overflow-hidden shadow-md',
						header: 'p-4 sm:px-5',
						body: 'p-4 sm:p-5',
						footer: 'p-4 sm:px-5',
					},
					defaultVariants: {
						variant: 'soft',
					},
				},
				button: {
					slots: {
						base: [
							'rounded-2xl font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75',
							'transition-colors',
						],
					},
					defaultVariants: {
						size: 'md',
					},
				},
				input: {
					slots: {
						base: [
							'w-full rounded-2xl border-0 appearance-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
							'transition-colors',
						],
					},
					defaultVariants: {
						size: 'md',
					},
				},
				textarea: {
					slots: {
						base: [
							'w-full rounded-2xl border-0 appearance-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
							'transition-colors',
						],
					},
					defaultVariants: {
						size: 'md',
					},
				},
				navigationMenu: {
					slots: {
						// 让侧边栏更像设计图：更圆、更干净、更“胶囊”
						link: 'group relative w-full flex items-center justify-between gap-3 font-medium text-base before:absolute before:z-[-1] before:rounded-full focus:outline-none focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 px-4 py-3.5',
						linkLeadingIcon: 'shrink-0 size-5',
						linkTrailingIcon: 'size-4 opacity-0 group-hover:opacity-50 transition-opacity',
						label: 'w-full flex items-center gap-1.5 font-semibold text-xs/5 px-4 py-2',
					},
				},
				pageHero: {
					slots: {
						// 默认 PageHero 太“空”，整体密度收紧，更接近设计图
						container: 'flex flex-col lg:grid py-10 sm:py-12 lg:py-14 gap-10 sm:gap-y-14',
						title: 'text-4xl sm:text-5xl text-pretty tracking-tight font-bold',
						description: 'text-base sm:text-lg',
						body: 'mt-6',
						footer: 'mt-6',
					},
				},
				pageGrid: {
					base: 'relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
				},
				pageCard: {
					slots: {
						root: 'relative flex rounded-2xl shadow-sm',
						container: 'relative flex flex-col flex-1 lg:grid gap-x-6 gap-y-3 p-4 sm:p-5',
						header: 'mb-3',
						footer: 'pt-3 mt-auto',
						title: 'text-[15px] sm:text-base text-pretty font-semibold',
						description: 'text-sm text-pretty',
					},
					defaultVariants: {
						variant: 'soft',
					},
				},
				dropdownMenu: {
					slots: {
						content:
							'min-w-32 backdrop-blur shadow-xl rounded-2xl ring overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-dropdown-menu-content-transform-origin) flex flex-col',
						item: 'group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-xl data-disabled:cursor-not-allowed data-disabled:opacity-75',
					},
				},
				modal: {
					// 保证 Ctrl+K / 各类弹层永远在最顶层（高于 TopBar 的 z-50）
					slots: {
						overlay: 'fixed inset-0 z-[9998]',
						content: 'divide-y flex flex-col focus:outline-none z-[9999] rounded-2xl shadow-xl ring',
					},
				},
			},
		}),
		Icons({
			compiler: 'vue3',
			autoInstall: false,
		}),
	],

	// Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
	//
	// 1. prevent Vite from obscuring rust errors
	clearScreen: false,
	// 2. tauri expects a fixed port, fail if that port is not available
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
			// 3. tell Vite to ignore watching `src-tauri`
			ignored: ['**/src-tauri/**'],
		},
	},
}))
