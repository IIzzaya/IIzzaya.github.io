---
layout: post
title: "Javascript语法小记===与=="
categories: [Javascript]
tags: [es6, javascript, programming]
last_updated:
---

* Kramdown table of contents
{:toc .toc}
> es6下
>
> 一篇文章，JavaScript标准参考教程，运算符[http://javascript.ruanyifeng.com/grammar/operator.html#toc6](http://javascript.ruanyifeng.com/grammar/operator.html#toc6)

# "==="与"=="

"==="叫做严格运算符，"=="叫做相等运算符。

严格运算符的运算规则如下:

(1)不同类型值

如果两个值的类型不同，直接返回false。

(2)同一类的原始类型值

同一类型的原始类型的值（数值、字符串、布尔值）比较时，值相同就返回true，值不同就返回false。

(3)同一类的复合类型值

两个复合类型（对象、数组、函数）的数据比较时，不是比较它们的值是否相等，而是比较它们是否指向同一个对象。

(4)undefined和null

undefined 和 null 与自身严格相等。

出处[https://www.zhihu.com/question/31442029](https://www.zhihu.com/question/31442029)