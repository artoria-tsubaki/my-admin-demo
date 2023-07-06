/**
 * 1. __proto__ 指向构造函数的原型
 * 2. prototype 指向实例的原型
 */

function Foo() {}
const foo = new Foo()

console.log(Foo.__proto__ === Function.prototype)
console.log(foo.__proto__ === Foo.prototype)
console.log(Foo.prototype.__proto__ === Object.prototype)


// 原型链是JavaScript中的一个重要概念，它是由对象的 __proto__ 属性组成的链式结构，用于实现对象之间的继承关系。每个对象都有一个 __proto__ 属性，指向其构造函数的原型对象，而原型对象也有一个 __proto__ 属性，指向其构造函数的原型对象，这样就形成了一个链式结构，即原型链。当我们访问一个对象的属性时，如果该对象本身没有该属性，JavaScript会沿着原型链向上查找，直到找到该属性或者到达原型链的顶端（即 Object.prototype.__proto__ 为 null）为止。这样就实现了对象之间的继承关系，使得我们可以在不同的对象之间共享属性和方法，提高了代码的复用性和可维护性。
