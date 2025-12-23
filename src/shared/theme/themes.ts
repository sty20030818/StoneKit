export type ThemeKey = 'lavender' | 'mint' | 'ocean' | 'sunset'

export type ThemeTokens = {
	key: ThemeKey
	primary: string
	primaryHover: string
	primaryLight: string
	primaryText: string
	accentText: string
	border: string
	ring: string
	shadow: string
	gradient: string
	blob1: string
	blob2: string
	selectionBg: string
	btnColor: string
}

export const THEMES: Record<ThemeKey, ThemeTokens> = {
	lavender: {
		key: 'lavender',
		primary: 'bg-violet-600',
		primaryHover: 'hover:bg-violet-700',
		primaryLight: 'bg-violet-100',
		primaryText: 'text-violet-900',
		accentText: 'text-violet-600',
		border: 'border-violet-200',
		ring: 'ring-violet-200',
		shadow: 'shadow-violet-500/20',
		gradient: 'from-violet-50 to-fuchsia-50',
		blob1: 'bg-purple-300',
		blob2: 'bg-blue-300',
		selectionBg: 'selection:bg-purple-300',
		btnColor: '#8b5cf6',
	},
	mint: {
		key: 'mint',
		primary: 'bg-emerald-600',
		primaryHover: 'hover:bg-emerald-700',
		primaryLight: 'bg-emerald-100',
		primaryText: 'text-emerald-900',
		accentText: 'text-emerald-600',
		border: 'border-emerald-200',
		ring: 'ring-emerald-200',
		shadow: 'shadow-emerald-500/20',
		gradient: 'from-emerald-50 to-teal-50',
		blob1: 'bg-emerald-300',
		blob2: 'bg-teal-300',
		selectionBg: 'selection:bg-emerald-300',
		btnColor: '#10b981',
	},
	ocean: {
		key: 'ocean',
		primary: 'bg-blue-600',
		primaryHover: 'hover:bg-blue-700',
		primaryLight: 'bg-blue-100',
		primaryText: 'text-blue-900',
		accentText: 'text-blue-600',
		border: 'border-blue-200',
		ring: 'ring-blue-200',
		shadow: 'shadow-blue-500/20',
		gradient: 'from-blue-50 to-cyan-50',
		blob1: 'bg-blue-300',
		blob2: 'bg-indigo-300',
		selectionBg: 'selection:bg-blue-300',
		btnColor: '#2563eb',
	},
	sunset: {
		key: 'sunset',
		primary: 'bg-orange-500',
		primaryHover: 'hover:bg-orange-600',
		primaryLight: 'bg-orange-100',
		primaryText: 'text-orange-900',
		accentText: 'text-orange-600',
		border: 'border-orange-200',
		ring: 'ring-orange-200',
		shadow: 'shadow-orange-500/20',
		gradient: 'from-orange-50 to-rose-50',
		blob1: 'bg-orange-300',
		blob2: 'bg-red-300',
		selectionBg: 'selection:bg-orange-300',
		btnColor: '#f97316',
	},
}
