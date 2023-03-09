import { expect, describe, it } from 'vitest'
import { DependencyInjection } from './index'

class Z {}
class W {}
class Y {
  constructor(private readonly w: W) {}
  test(): string {
    return 'ok'
  }
}
class X {
  constructor(private readonly y: Y, private readonly z: Z) {}
  getTest(): string {
    return this.y.test()
  }
}

describe(DependencyInjection.name, () => {
  it('should be execute injection', () => {
    const handler = new DependencyInjection<X, Y | Z>()
    handler.dependencies.push({ ref: Y.name, value: W })
    const objectX = handler.injectDependency(X, [Y, Z])
    expect(objectX.getTest()).toBe('ok')
  })
})
