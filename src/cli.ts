#!/usr/bin/env node

import { decarg } from 'decarg'
import { bench, Options, run } from '.'

const options = decarg(new Options())!

try {
  if (options.iterations) {
    bench(options)
  } else {
    console.log(run(options))
  }
} catch (error) {
  if (error) console.error(error)
  process.exit(1)
}
