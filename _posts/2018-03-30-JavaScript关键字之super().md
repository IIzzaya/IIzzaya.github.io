---
layout: post
title: "JavaScript关键字之super()"
categories: [Javascript]
tags: [beginners]
last_updated:
---

> [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/super](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/super)



The **super** keyword is used to access and call functions on an object's parent.

**super**关键字用于访问和调用一个对象的父对象上的函数。

The `super.prop` and `super[expr]` expressions are valid in any [method definition](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions) in both [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) and [object literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer).

`super.prop`和`super[expr]`表达式在[类](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)和[对象字面量](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)任何[方法定义](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions)中都是有效的。

# Syntax语法

~~~javascript
super([arguments]); // calls the parent constructor.调用 父对象/类 的构造函数
super.[functionOnParent]([arguments]); // calls the parent functions 调用 父对象/类 上的方法
~~~

# Description描述

When used in a constructor, the `super` keyword appears alone and must be used before the `this` keyword is used. The `super` keyword can also be used to call functions on a parent object.

在构造函数中使用时，`super`关键字将单独出现，并且必须在使用`this`关键字之前使用。`super`关键字也可以用来调用父对象上的函数。

# Example示例

## Using  super in classes

 Here `super()` is called to avoid duplicating the constructor parts' that are common between `Rectangle` and `Square`.



~~~javascript
class Rectangle {
  constructor(height, width) {
    this.name = 'Rectangle';
    this.height = height;
    this.width = width;
  }
  sayName() {
    console.log('Hi, I am a ', this.name + '.');
  }
  get area() {
    return this.height * this.width;
  }
  set area(value) {
    this.height = this.width = Math.sqrt(value);
  }
}

class Square extends Rectangle {
  constructor(length) {
    this.height; // ReferenceError, super needs to be called first! super需要先被调用
    
    // Here, it calls the parent class' constructor with lengths
    // provided for the Rectangle's width and height
    super(length, length);
    
    // Note: In derived classes, super() must be called before you
    // can use 'this'. Leaving this out will cause a reference error.
    this.name = 'Square';
  }
}
~~~

## Super-calling static methods

~~~javascript
class Rectangle{
  constructor() {}
  static logNbSides() {
    return 'I have 4 sides';
  }
}

class Square extends Rectangle {
  constructor() {}
  static logDescription() {
    return super.logNbSides() + ' which are all equal';
  }
}
Square.logDescription(); // 'I have 4 sides which are all equal'
~~~

## Deleting super properties will throw an error

You cannot use the [delete operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete) and `super.prop` or `super[expr]` to delete a parent class' property, it will throw a [`ReferenceError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError).

你不能使用 [delete 操作符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete) 加 `super.prop` 或者 `super[expr]` 去删除父类的属性，这样做会抛出 [`ReferenceError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError)。

~~~javascript
class Base {
  constructor() {}
  foo() {}
}
class Derived extends Base {
  constructor() {}
  delete() {
    delete super.foo; // this is bad
  }
}
new Derived().delete(); 
// ReferenceError: invalid delete involving 'super'.
~~~

## `super.prop` cannot overwrite non-writable properties

When defining non-writable properties with e.g. [`Object.defineProperty`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty), `super` cannot overwrite the value of the property.

当使用 [`Object.defineProperty`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 定义一个属性为不可写时，`super`将不能重写这个属性的值。

```javascript
class X {
  constructor() {
    Object.defineProperty(this, 'prop', {
      configurable: true,
      writable: false, 
      value: 1
    });
  } 
  f() { 
    super.prop = 2;
  }
}

var x = new X();
x.f(); // TypeError: "prop" is read-only
console.log(x.prop); // 1
```

## Using `super.prop` in object literals

Super can also be used in the [object initializer / literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer) notation. In this example, two objects define a method. In the second object, `super` calls the first object's method. This works with the help of [`Object.setPrototypeOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) with which we are able to set the prototype of `obj2` to `obj1`, so that `super` is able to find `method1` on `obj1`.

`Super`也可以在[object initializer / literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer) 符号中使用。在下面的例子中，两个对象各定义了一个方法。在第二个对象中, 我们使用`super`调用了第一个对象中的方法。 当然，这需要我们先利用 [`Object.setPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) 将`obj2`的原型加到`obj1`上，然后才能够使用`super`调用 `obj1`上的`method1`。

```javascript
var obj1 = {
  method1() {
    console.log("method 1");
  }
}

var obj2 = {
  method2() {
   super.method1();
  }
}

Object.setPrototypeOf(obj2, obj1);
obj2.method2(); 
// logs "method 1"
```

# Specifications规范

| Specification                            | Status          | Comment             |
| ---------------------------------------- | --------------- | ------------------- |
| [ECMAScript 2015 (6th Edition, ECMA-262)super](http://www.ecma-international.org/ecma-262/6.0/#sec-super-keyword) | Standard        | Initial definition. |
| [ECMAScript Latest Draft (ECMA-262)super](https://tc39.github.io/ecma262/#sec-super-keyword) | Living Standard |                     |

