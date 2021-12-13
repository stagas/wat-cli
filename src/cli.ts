#!/usr/bin/env node

import { decarg } from 'decarg'
import { run, Options } from '.'

const options = decarg(new Options())!

try {
  console.log(run(options))
} catch (error) {
  if (error) console.error(error)
  process.exit(1)
}
