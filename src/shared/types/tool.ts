export type ToolCategory = '开发工具' | '设计' | '媒体' | '安全'

export interface ToolItem {
	id: string
	name: string
	description: string
	icon: string
	to: string
	category: ToolCategory
	featured?: boolean
	hot?: boolean
}
