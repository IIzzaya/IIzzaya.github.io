---
layout: post
title: "Javascript入门之Arrow Function"
categories: [Javascript]
tags: [es6, javascript, beginners, webdev, programming]
last_updated:
---

* Kramdown table of contents
{:toc .toc}
> es6语法规则下

参考自[https://dev.to/srebalaji/es6-for-beginners-with-example-c7](https://dev.to/srebalaji/es6-for-beginners-with-example-c7)

# **Arrow Function**

~~~javascript
// Old Syntax
function oldOne() {
 console.log("Hello World..!");
}
// New Syntax
var newOne = () => {
 console.log("Hello World..!");
}
~~~

新的语法包括两部分

* var newOne = ();
* => {}


var newOne = ()这代表声明的一个变量，并且将一个方法`(i.e)()`赋值给它

直接上例子：

~~~javascript
let NewOneWithParameters = (a, b) => {
 console.log(a+b);
}
NewOneWithParameters(10, 20);// 30
~~~

~~~javascript
let Func = (a, b = 10) => {
 return a + b; 
}
Func(20); // 20 + 10 = 30
Func(20, 50); // 20 + 50 = 70
Func(20, (a = 5,b = 10) => {return a + b}); //35
~~~

~~~javascript
let NotWorkingFunction = (a = 10, b) => {
 return a + b;
}
NotWorkingFunction(20); // NAN. Not gonna work.
NotWorkingFunction(20, 30); // 50; Works fine
~~~

下面参考自[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

## 语法

~~~javascript
(参数1, 参数2, …, 参数N) => {函数声明}
(参数1, 参数2, …, 参数N) => 表达式（单一）
//相当于：(参数1, 参数2, …, 参数N) =>{ return表达式}

// 当只有一个参数时，圆括号是可选的：
(单一参数) => {函数声明}
单一参数 => {函数声明}

// 没有参数的函数应该写成一对圆括号。
() => {函数声明}
~~~

## 进阶语法

~~~javascript
//加括号的函数体返回对象：
参数=> ({foo: bar})

//支持剩余参数和默认参数
(参数1, 参数2, ...rest) => {函数声明}
(参数1 = 默认值1,参数2, …, 参数N = 默认值N) => {函数声明}

//同样支持参数列表解构
let f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;
f();  // 6
~~~

## 描述

引入箭头函数有两个方面的作用：更简短的函数并且不绑定`this`。

更短的函数

~~~javascript
var materials = [
  'Hydrogen',
  'Helium',
  'Lithium',
  'Beryllium'
];

materials.map(function(material) { 
  return material.length; 
}); // [8, 6, 7, 9]

materials.map((material) => {
  return material.length;
}); // [8, 6, 7, 9]

materials.map(material => material.length); // [8, 6, 7, 9]
~~~



箭头函数可以有一个“简写体”或常见的“块体”。

## 简写体

在一个简写体中，只需要一个表达式，并附加一个隐式的返回值。在块体中，必须使用明确的`return`语句。

~~~javascript
var func = x => x * x;                  
// 简写函数 省略return

var func = (x, y) => { return x + y; }; 
//常规编写 明确的返回值
~~~

## 换行

箭头函数在参数和箭头之间不能换行。

~~~javascript
var func = ()
           => 1; 
// SyntaxError: expected expression, got '=>'
~~~

