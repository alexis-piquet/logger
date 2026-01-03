export const LOG_LEVELS = [
	'debug',
	'info',
	'warn',
	'error',
	'trace',
	'event',
	'success',
	'net',
] as const

export type LogLevel = typeof LOG_LEVELS[number]

export type LoggerFn = {
	[K in Exclude<LogLevel, 'net'>]: (...a: unknown[]) => void
}

export type ILogger = LoggerFn & {
	scope(segment: string): ILogger
	fn(name: string): LoggerFn
}

export interface LoggerOptions {
	enabled?: boolean
	namespace?: string
}