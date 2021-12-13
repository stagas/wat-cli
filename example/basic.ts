import { run } from '../src'

console.log(
  run({
    file: __dirname + '/math.wat',
    args: [1, '2'],
    name: 'add',
  })
)
