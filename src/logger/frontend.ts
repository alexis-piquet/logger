import type { ILogger, LoggerFn, LoggerOptions, LogLevel } from '#types'

export class Logger implements ILogger {
	private enabled: boolean
	private namespace: string
	private styles: Record<LogLevel, [string, string]>

	constructor({ enabled = false, namespace = '' }: LoggerOptions) {
		this.enabled = enabled
		this.namespace = namespace
		this.styles = {
			debug:   ['🐛 [DEBUG]',   'color:#b084ff;font-weight:bold;'],
			error:   ['🛑 [ERROR]',   'color:red;font-weight:bold;'],
			event:   ['🎯 [EVENT]',   'color:violet;font-weight:bold;'],
			info:    ['ℹ️ [INFO]',    'color:#00aaff;font-weight:bold;'],
			net:     ['📡 [NETWORK]', 'color:#00ccff;font-weight:bold;'],
			success: ['✅ [SUCCESS]', 'color:limegreen;font-weight:bold;'],
			trace:   ['🔍 [TRACE]',   'color:gray;'],
			warn:    ['⚠️ [WARN]',    'color:orange;font-weight:bold;'],
		}
	}

	private _emit(level: LogLevel, args: unknown[]): void {
		if (!this.enabled) return

		const [prefix, style] = this.styles[level] ?? this.styles.info
		const ts = new Date().toISOString()
		const ns = this.namespace
			? ` [commanders_act_assistant:${this.namespace}]`
			: ''

		console.log(
			`%c${prefix}%c${ns}%c ${ts}`,
			style,
			'color:#999',
			'color:#bbb',
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

	debug(...a: unknown[]): void   { this._emit('debug', a) }
	info(...a: unknown[]): void    { this._emit('info', a) }
	warn(...a: unknown[]): void    { this._emit('warn', a) }
	error(...a: unknown[]): void   { this._emit('error', a) }
	trace(...a: unknown[]): void   { this._emit('trace', a) }
	event(...a: unknown[]): void   { this._emit('event', a) }
	success(...a: unknown[]): void { this._emit('success', a) }
}
