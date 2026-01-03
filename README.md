# Logger

<p align="center">
  <img
    src="https://github.com/alexis-piquet/logger/blob/main/assets/logo.png"
    alt="logger"
    width="300">
</p>

A lightweight, shared logger for **frontend and backend** with a **unified API**, strong TypeScript typings, and zero runtime coupling.

This logger is designed to:

* work identically in **Node.js** and the **browser**
* provide scoped loggers (`scope`, `fn`)
* avoid conditionals via a **MutedLogger (Null Object pattern)**
* keep implementations (frontend / backend) fully isolated
* stay dependency-free

## Features

* ✅ Same API for frontend and backend
* ✅ Strongly typed (levels, logger API, scopes)
* ✅ Immutable scoped loggers
* ✅ Zero-op logger in production
* ✅ No external logging dependency
* ✅ Extensible by design (JSON, Discord, file sinks, etc.)

## Installation

```bash
npm install @alexis-piquet/logger
```

## Usage

### Create a logger

```ts
import { createLogger } from '@alexis-piquet/logger'

const logger = createLogger({
	env: 'dev',
	isBackend: true, // false in browser
	enabled: true,
	namespace: 'server',
})
```

In production, the logger is automatically muted:

```ts
env: 'prod' // returns a MutedLogger
```

### Basic logging

```ts
logger.info('Server starting')
logger.warn('Cache miss', { key })
logger.error('Unhandled error', err)
```

Available levels:

* `debug`
* `info`
* `warn`
* `error`
* `trace`
* `event`
* `success`

### Scoped loggers

Scopes are **immutable** and composable.

```ts
const dbLogger = logger.scope('database')

dbLogger.debug('Query executed')
```

Namespaces are automatically chained:

```
server:database
```

### Function-level logging (`fn`)

`fn()` creates a logger bound to a function or logical unit.

```ts
const log = logger.scope('auth').fn('login')

log.debug('Payload received')
log.success('User authenticated')
```

This is especially useful for handlers, services, and reducers.

## Frontend vs Backend behavior

### Backend (Node.js)

* Uses `console.log` / `console.error`
* Plain text output with timestamp and namespace
* Intended for CLI, containers, logs aggregation

### Frontend (Browser)

* Styled console output
* Visual prefixes and colors per log level
* Same API, different rendering

## Production behavior

In production (`env: 'prod'`):

* `createLogger()` returns a `MutedLogger`
* All logging methods are no-ops
* No conditionals required in your code

```ts
logger.debug('This will never run')
```

## Type system (shared)

```ts
export type LogLevel =
	| 'debug'
	| 'info'
	| 'warn'
	| 'error'
	| 'trace'
	| 'event'
	| 'success'
	| 'net'
```

```ts
export type ILogger = {
	debug(...a: unknown[]): void
	info(...a: unknown[]): void
	warn(...a: unknown[]): void
	error(...a: unknown[]): void
	trace(...a: unknown[]): void
	event(...a: unknown[]): void
	success(...a: unknown[]): void
	scope(segment: string): ILogger
	fn(name: string): LoggerFn
}
```

## Development

```bash
npm ci
```

Build & test locally as usual.

## Publishing

Versioning follows **semver**.

```bash
npm run major-release # 1.0.0 → 2.0.0
npm run minor-release # 1.0.0 → 1.1.0
npm run patch-release # 1.0.0 → 1.0.1
```

Scripts handle:

* version bump
* build
* git tagging
* publish

More details:

* npm versioning: [https://docs.npmjs.com/cli/v6/commands/npm-version](https://docs.npmjs.com/cli/v6/commands/npm-version)
* semver: [https://github.com/npm/node-semver](https://github.com/npm/node-semver)

## Non-goals

This logger intentionally does **not**:

* manage log persistence
* implement log rotation
* replace structured loggers like Pino/Winston

It is meant to be a **clean foundation**, not a logging framework.

## License

MIT