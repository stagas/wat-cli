import { Options, run } from '../'

describe('run', () => {
  it('works', () => {
    expect(
      run(new Options({ file: __dirname + '/../example/math.wat' }))
    ).toEqual(42)
  })
})
