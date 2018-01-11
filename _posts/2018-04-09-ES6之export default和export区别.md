---
layout: post
title: "ES6之export default和export区别"
categories: [Javascript]
tags: [beginners]
last_updated:
---

> [https://www.jianshu.com/p/edaf43e9384f](https://www.jianshu.com/p/edaf43e9384f)
>
> [https://stackoverflow.com/questions/42478661/difference-between-export-and-export-default-in-javascript](https://stackoverflow.com/questions/42478661/difference-between-export-and-export-default-in-javascript)

* `export`与`export default`均可以用于常量、函数、文件、模块的导出。
* 在其他模块中通过`import [filename] from ".."导入外部模块。`
* 在一个文件或模块中，`export`、`import`可以有多个，`export default`**仅能有一个**。
* 通过`export`方式导出的，在导入时需要加`{}`，`export default`则不需要。


~~~javascript
function f1(){};
function f2(){};
export {f1},{f2};
export function f3(){};
export var v4;
//import {f1,f2,f3,v4} from "*.js"
~~~

~~~javascript
function f1(){};
export default f1(){};
//import f1 from "*.js"
~~~

