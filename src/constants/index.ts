import type { LogLevel } from "#types"

export const APPLICATION_LOGGER = 'APPLICATION' as const
export const AUTH_LOGGER = 'AUTH' as const
export const DATABASE_LOGGER = 'DATABASE' as const
export const SERVER_LOGGER = 'SERVER' as const
export const SOFTWARE_LOGGER = 'SOFTWARE' as const
export const WEBSITE_LOGGER = 'WEBSITE' as const

export const LOGGERS = [
	APPLICATION_LOGGER,
	AUTH_LOGGER,
	DATABASE_LOGGER,
	SERVER_LOGGER,
	SOFTWARE_LOGGER,
	WEBSITE_LOGGER,
] as const

export const LEVEL_PREFIX: Record<LogLevel, string> = {
	debug:   '🐛 [DEBUG]',
	info:    'ℹ️ [INFO]',
	warn:    '⚠️ [WARN]',
	error:   '🛑 [ERROR]',
	trace:   '🔍 [TRACE]',
	event:   '🎯 [EVENT]',
	success: '✅ [SUCCESS]',
	net:     '📡 [NETWORK]',
} as const
