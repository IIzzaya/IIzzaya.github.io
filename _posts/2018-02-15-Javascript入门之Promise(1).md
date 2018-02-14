---
layout: post
title: "Javascript入门之Promise(1)"
categories: [Javascript]
tags: [es6, javascript, programming, promise]
last_updated:
---

* Kramdown table of contents
{:toc .toc}
> 摘自[http://www.hangge.com/blog/cache/detail_1635.html](http://www.hangge.com/blog/cache/detail_1635.html)

# Promise 相关概念

promises 的概念是由 CommonJS 小组的成员在 Promises/A 规范中提出来的。

## then()方法介绍

根据 Promise/A 规范，promise 是一个对象，只需要 then 这一个方法。then 方法带有如下三个参数：

- 成功回调
- 失败回调
- 前进回调（规范没有要求包括前进回调的实现，但是很多都实现了）。

一个全新的 promise 对象从每个 then 的调用中返回。

## Promise对象状态

Promise 对象代表一个异步操作，其不受外界影响，有三种状态：

- Pending（进行中、未完成的）
- Resolved（已完成，又称 Fulfilled）
- Rejected（已失败）。

（1）promise 从未完成的状态开始，如果成功它将会是完成态，如果失败将会是失败态。

（2）当一个 promise 移动到完成态，所有注册到它的成功回调将被调用，而且会将成功的结果值传给它。另外，任何注册到 promise 的成功回调，将会在它已经完成以后立即被调用。

（3）同样的，当一个 promise 移动到失败态的时候，它调用的是失败回调而不是成功回调。

（4）对包含前进特性的实现来说，promise 在它离开未完成状态以前的任何时刻，都可以更新它的 progress。当 progress 被更新，所有的前进回调(progress callbacks)会被传递以 progress 的值，并被立即调用。前进回调被以不同于成功和失败回调的方式处理；如果你在一个 progress 更新已经发生以后注册了一个前进回调，新的前进回调只会在它被注册以后被已更新的 progress 调用。

（5）注意：只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

# 使用promise的优势

## 解决回调地狱(Callback Hell)问题

* 有时我们要进行一些相互间有依赖关系的异步操作，比如有多个请求，后一个的请求需要上一次请求的返回结果。过去常规做法只能 callback 层层嵌套，但嵌套层数过多的话就会有 callback hell 问题。比如下面代码，可读性和维护性都很差的。

~~~javascript
firstAsync(function(data){
    //处理得到的 data 数据
    //....
    secondAsync(function(data2){
        //处理得到的 data2 数据
        //....
        thirdAsync(function(data3){
              //处理得到的 data3 数据
              //....
        });
    });
});
~~~

* 如果使用 promises 的话，代码就会变得扁平且更可读了。前面提到 then 返回了一个 promise，因此我们可以将 then 的调用不停地串连起来。其中 then 返回的 promise 装载了由调用返回的值。

~~~javascript
firstAsync()
.then(function(data){
    //处理得到的 data 数据
    //....
    return secondAsync();
})
.then(function(data2){
    //处理得到的 data2 数据
    //....
    return thirdAsync();
})
.then(function(data3){
    //处理得到的 data3 数据
    //....
});
~~~

## 更好地进行错误捕获

多重嵌套 callback 除了会造成上面讲的代码缩进问题，更可怕的是可能会造成无法捕获异常或异常捕获不可控。
（1）比如下面代码我们使用 setTimeout 模拟异步操作，在其中抛出了个异常。但由于异步回调中，回调函数的执行栈与原函数分离开，导致外部无法抓住异常。

~~~javascript
function fetch(callback) {
    setTimeout(() => {
        throw Error('请求失败')
    }, 2000)
}
 
try {
    fetch(() => {
        console.log('请求处理') // 永远不会执行
    })
} catch (error) {
    console.log('触发异常', error) // 永远不会执行
}
 
// 程序崩溃
// Uncaught Error: 请求失败
~~~

（2）如果使用 promises 的话，通过 reject 方法把 Promise 的状态置为 rejected，这样我们在 then 中就能捕捉到，然后执行“失败”情况的回调。

~~~javascript
function fetch(callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
             reject('请求失败');
        }, 2000)
    })
}
 
 
fetch()
.then(
    function(data){
        console.log('请求处理');
        console.log(data);
    },
    function(reason, data){
        console.log('触发异常');
        console.log(reason);
    }
);
~~~

当然我们在 catch 方法中处理 reject 回调也是可以的。

~~~javascript
function fetch(callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
             reject('请求失败');
        }, 2000)
    })
}
 
 
fetch()
.then(
    function(data){
        console.log('请求处理');
        console.log(data);
    }
)
.catch(function(reason){
    console.log('触发异常');
    console.log(reason);
});
~~~

