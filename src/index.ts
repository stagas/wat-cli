import * as fs from 'fs'
import * as path from 'path'
import compile from 'wat-compiler'
import { arg } from 'decarg'

export class Options {
  @arg('<file>', 'The .wat file to run')
  file?: string

  @arg('--', '[...args]', 'The arguments to pass to the function')
  args: (string | number)[] = []

  @arg('-n', '--name', 'The exported function name to use (default: "main")')
  name = 'main'

  static examples = {
    'my-app.wat': 'Runs my-app.wat',
    'my-app.wat -n add -- 1 2': 'Runs export `add` with arguments `(1,2)`',
  }

  constructor(opts: Partial<Options> = {}) {
    Object.assign(this, opts)
  }
}

/**
 * Runs a function in a .wat file with the given arguments.
 *
 * @param options
 * @param options.file The .wat file to run
 * @param options.args The arguments to pass to the function
 * @param options.name The exported function name to use
 */
export const run = (options: Options) => {
  const buffer = compile(
    fs.readFileSync(path.resolve(process.cwd(), options.file!), 'utf-8')
  )
  const mod = new WebAssembly.Module(buffer)
  const instance = new WebAssembly.Instance(mod)

  const fn = instance.exports[options.name!] as (...args: unknown[]) => unknown
  if (!fn) throw new Error(`Export "${options.name}" was not found.`)

  const result = fn(...options.args.map(parse))
  return result
}

const parse = (x: string | number) => {
  if (typeof x === 'number') return x
  const n = parseFloat(x)
  if (n.toString() !== x) return x
  return n
}
