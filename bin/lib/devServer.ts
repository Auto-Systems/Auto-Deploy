import chalk, { Chalk } from 'chalk'
import { ChildProcess, spawn } from 'child_process'
import chokidar from 'chokidar'
import pDebounce from 'p-debounce'
import { Readable, Writable } from 'stream'
import { absolutePath } from './absolutePath'
import { run } from './run'

type ProcName = 'API' | 'Web'
type Status = 'neutral' | 'success' | 'start' | 'fail'
type Config<T> = { [key in ProcName]: T }

const urls: Config<string | undefined> = {
  Web: process.env.WEB_URL,
  API: process.env.API_URL,
}

const colors: Config<Chalk> = {
  Web: chalk.cyan.dim,
  API: chalk.blue.dim,
}

interface State {
  procs: {
    [key: string]: ChildProcess
  }
  currentTitleProc: null | {
    name: ProcName
  }
}

const state: State = {
  procs: {},
  currentTitleProc: null,
}

const title = (name: ProcName, status: Status = 'neutral') => {
  const baseColor = colors[name] || chalk.dim
  const symbol =
    status === 'success' ? chalk.green('✔') : status === 'fail' ? chalk.red('✖') : status === 'start' ? chalk.yellow('↻') : '↴'
  return baseColor(`[${name} ${symbol}]`)
}

function titleStream(name: ProcName, input: Readable, output: Writable) {
  input.on('data', (data) => {
    if (!state.currentTitleProc || state.currentTitleProc.name !== name) {
      console.log(title(name))
      state.currentTitleProc = { name }
    }
    output.write(data)
  })
}

function titleLog(name: ProcName, status: Status) {
  console.log(title(name, status))
  state.currentTitleProc = null
}

function procIsRunning(name: ProcName) {
  const proc = state.procs[name]
  return proc && !proc.killed
}

function killProc(name: ProcName): Promise<boolean> {
  const proc = state.procs[name]
  if (!proc || proc.killed) {
    return Promise.resolve(false)
  }
  return new Promise((resolve, reject) => {
    proc.on('exit', () => {
      resolve(true)
    })
    proc.kill()
  })
}

async function spawnProc(name: ProcName, restart: boolean = true): Promise<void> {
  let loaded = false

  if (!restart && procIsRunning(name)) {
    return
  }

  if (await killProc(name)) {
    titleLog(name, 'start')
  }

  const proc = spawn('npm', ['run', 'start'], {
    stdio: ['inherit', 'pipe', 'pipe'],
    cwd: absolutePath(name),
  })
  if (!proc.stderr || !proc.stdout) {
    throw new Error(`unreadable stream from proc ${name}`)
  }
  titleStream(name, proc.stderr, process.stderr)
  titleStream(name, proc.stdout, process.stdout)
  proc.on('exit', () => {
    titleLog(name, 'fail')
    loaded = true
    delete state.procs[name]
  })

  state.procs[name] = proc

  return new Promise((resolve, reject) => {
    if (!proc.stderr || !proc.stdout) {
      throw new Error(`unreadable stream from proc ${name}`)
    }
    proc.stderr.on('data', (data) => {
      if (!loaded && (!urls[name] || (urls[name] && data.toString('utf8').includes(urls[name])))) {
        titleLog(name, 'success')
        loaded = true
        resolve()
      }
    })
  })
}

process.on('exit', function killAll() {
  for (const proc of Object.values(state.procs)) {
    proc.kill()
  }
})

function onChange(paths: string | string[], handler: () => void) {
  chokidar.watch(paths, { ignoreInitial: true }).on('all', pDebounce(handler, 1000, { leading: true }))
}

export default async function main() {


  // spawnProc('mobile')
  //  onChange(absolutePath('mobile/**/*.graphql'), () =>
  //    run(['npm run gen'], absolutePath('mobile')),
  //  )

  spawnProc('API')
  onChange([absolutePath('API/src/Modules/**/*.ts'),  absolutePath('API/src/Configuration/**/*.ts'), absolutePath('API/src/Controller/Decorators/*.ts'), absolutePath('API/src/*.ts')], () => spawnProc('API'))

  spawnProc('Web')
  onChange([absolutePath('Web/bin/**/*.ts'), absolutePath('Web/Server/index.ts')], () => spawnProc('Web'))
  onChange(absolutePath('Web/**/*.graphql'), () => run(['npm run gen'], absolutePath('web')))
}
