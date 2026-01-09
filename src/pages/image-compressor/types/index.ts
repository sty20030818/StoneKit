/**
 * 压缩任务状态
 */
export type TaskStatus = 'pending' | 'processing' | 'done' | 'error' | 'cancelled'

/**
 * 输出格式
 */
export type OutputFormat = 'webp' | 'webp-lossy' | 'keep' | 'avif'

/**
 * 压缩预设
 */
export type PresetId = 'material' | 'texture' | 'keep' | 'lossless'

/**
 * 压缩预设配置
 */
export type Preset = {
	id: PresetId
	label: string
	description: string
	icon: string
	format: OutputFormat
	quality: number
	lossless: boolean
	quantize: boolean
}

/**
 * 压缩选项
 */
export type CompressOptions = {
	format: OutputFormat
	quality: number
	maxSide?: number
	lossless: boolean
	stripExif: boolean
	preserveAlpha: boolean
	pngQuantQuality: number
}

/**
 * 单个压缩任务
 */
export type CompressTask = {
	id: string
	fileName: string
	filePath: string
	originalSize: number
	compressedSize?: number
	savingsPercent?: number
	status: TaskStatus
	progress: number
	error?: string
	thumbnail?: string
	outputPath?: string
	durationMs?: number
}

/**
 * 压缩作业（批量任务）
 */
export type CompressJob = {
	id: string
	tasks: CompressTask[]
	options: CompressOptions
	startedAt?: number
	completedAt?: number
}

/**
 * 进度事件（来自 Rust）
 */
export type ProgressEvent = {
	jobId: string
	taskId: string
	done: number
	total: number
	currentFile: string
	bytesBefore: number
	bytesAfter: number
	status: TaskStatus
	error?: string
}

/**
 * 压缩结果（来自 Rust）
 */
export type CompressResult = {
	taskId: string
	filePath: string
	originalSize: number
	compressedSize: number
	savingsPercent: number
	durationMs: number
	outputPath: string
}
