import { LEVEL_PREFIX } from '#constants'
import type { ILogger, LoggerFn, LoggerOptions, LogLevel } from '#types'

export class Logger implements ILogger {
	private enabled: boolean
	private namespace: string

	constructor({ enabled = false, namespace = '' }: LoggerOptions) {
		this.enabled = enabled
		this.namespace = namespace
	}

	private emit(level: LogLevel, args: unknown[]): void {
		if (!this.enabled) return

		const ts = new Date().toISOString()
		const ns = this.namespace ? ` [${this.namespace}]` : ''
		const prefix = LEVEL_PREFIX[level] ?? LEVEL_PREFIX.info

		const out =
			level === 'error' || level === 'warn'
				? console.error
				: console.log

		out(
			`${prefix}${ns} ${ts}`,
			...args
		)
	}

	scope(segment: string): Logger {
		return new Logger({
			enabled: this.enabled,
			namespace: this.namespace
				? `${this.namespace}:${segment}`
				: segment,
		})
	}

	fn(name: string): LoggerFn {
		const scoped = this.scope(name)
		return {
			debug: (...a) => scoped.debug(...a),
			info: (...a) => scoped.info(...a),
			warn: (...a) => scoped.warn(...a),
			error: (...a) => scoped.error(...a),
			trace: (...a) => scoped.trace(...a),
			event: (...a) => scoped.event(...a),
			success: (...a) => scoped.success(...a),
		}
	}

	debug(...a: unknown[]): void   { this.emit('debug', a) }
	info(...a: unknown[]): void    { this.emit('info', a) }
	warn(...a: unknown[]): void    { this.emit('warn', a) }
	error(...a: unknown[]): void   { this.emit('error', a) }
	trace(...a: unknown[]): void   { this.emit('trace', a) }
	event(...a: unknown[]): void   { this.emit('event', a) }
	success(...a: unknown[]): void { this.emit('success', a) }
}
