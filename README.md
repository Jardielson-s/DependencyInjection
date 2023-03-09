# Description
<p> DependencyInjection this is a lib for dependency injection. </p>

<br/>

# Usage
```c
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

# will give access to all methods of class X
const dependencies = new DependencyInjection<X, Y>().injectDependency(X, [Y])
```
```c
class Z {}
class W {}
class Y {
    constructor(private readonly w: W){}
    test(): string{
        return 'ok'
    }
}
class X {
    constructor(private readonly y: Y, private readonly z: Z){}
    getTest(): string {
        return this.y.test()
    }
}

const handler = new DependencyInjection<X, Y | Z>()

# added dependency of Y
handler.dependencies.push({ ref: Y.name, value: W })

# will give access to all methods of class X
const objectX = handler.injectDependency(X, [Y, Z])
```