import { expect, describe, it } from 'vitest'
import { DependencyInjection } from './dependencyInjection'

class Y {
    test(): string{
        return 'ok'
    }
}
class X {
    constructor(private readonly y: Y){}
    getTest(): string {
        return this.y.test()
    }
}
describe(DependencyInjection.name, () => {
    it('should be defined', () => {
        expect(DependencyInjection).toBeDefined()
    })

    it('should be defined dependencyInject', () => {
        expect(new DependencyInjection().injectDependency).toBeDefined()
    })

    it('should be defined dependencies', () => {
        const dependencies = new DependencyInjection()
        expect(dependencies.dependencies).toBeDefined()
    })

    it('should be execute injection', () => {
        const dependencies = new DependencyInjection<X, Y>().injectDependency(X, [Y])
        expect(dependencies.getTest()).toBe('ok')
    })

    it('should be execute error injection', () => {
        try {
          new DependencyInjection<X, Y | null>().injectDependency(X, [null])
        }catch(error){
            console.log(error.message)
            expect(error.message).toBe('INVALID DEPENDENCY: owner is not a constructor')
        }
    })
})