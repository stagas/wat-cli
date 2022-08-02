import { Options, run } from '../src'

console.log(
  run(
    new Options({
      file: __dirname + '/math.wat',
      args: [1, '2'],
      name: 'add',
    })
  )
)
