export type Class<T> = {new(...args: any): T}

export type Dependency<K> = {
    ref: string
    value: Class<K>
}