export type Class<T> = { new (...args: unknown[]): T }

export type Dependency<K> = {
  ref: string
  value: Class<K>
}
