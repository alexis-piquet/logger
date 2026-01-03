export * from '#constants'

import type { ILogger, LoggerFn, LoggerOptions } from "#types"
import { Logger as BackendLogger } from "#logger/backend"
import { Logger as FrontendLogger } from "#logger/frontend"

type Options = LoggerOptions & { env: 'prod' |'dev', isBackend: boolean }
type LoggerCtor = new (opts: LoggerOptions) => BackendLogger | FrontendLogger

export class MutedLogger implements ILogger {
	fn(): LoggerFn | ILogger {
		return this
	}

	debug(..._args: unknown[]): void {}
	info(..._args: unknown[]): void {}
	warn(..._args: unknown[]): void {}
	error(..._args: unknown[]): void {}
	trace(..._args: unknown[]): void {}
	event(..._args: unknown[]): void {}
	success(..._args: unknown[]): void {}

	scope(_segment?: string): ILogger {
		return this
	}
}

export function createLogger(opts: Options): ILogger {
	const { env, isBackend } = opts

	if (env === 'prod') return new MutedLogger()

	const LOGGER: LoggerCtor = Boolean(isBackend) ? BackendLogger : FrontendLogger

	return new LOGGER(opts)
}