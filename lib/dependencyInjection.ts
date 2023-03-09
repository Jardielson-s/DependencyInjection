import { Dependency, Class } from '@lib/shared/types'

export class DependencyInjection<T, K> {
  public dependencies: Dependency<unknown>[] = []

  public injectDependency(owner: Class<T>, args: Class<K>[]): T {
    try {
      return new owner(...args.map(arg => this.inject(arg)))
    } catch (err) {
      const error = err as Error
      throw Error(error.message)
    }
  }

  private inject(owner: Class<K>) {
    try {
      const dependencies = this.dependencies.filter(
        dependency => dependency.ref === owner.name
      )
      return new owner(
        ...dependencies.map(dependency => new dependency.value())
      )
    } catch (err) {
      const error = err as Error
      throw new Error(`INVALID DEPENDENCY: ${error.message}`)
    }
  }
}
