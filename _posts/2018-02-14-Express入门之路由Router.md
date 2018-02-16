---
layout: post
title: "Express入门之路由Router"
categories: [Javascript, Node.js, Express]
tags: [es6, node.js, router]
last_updated:
---

* Kramdown table of contents
{:toc .toc}
> 参考自[http://www.expressjs.com.cn/starter/hello-world.html](http://www.expressjs.com.cn/starter/hello-world.html)

# Hello World

~~~javascript
//声明部分
var express = require('express');
var app = express();

//设置路由
app.get('/', function (req, res) {
  res.send('Hello World!');
});

//设置监听
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
~~~

> `req` (请求) 和 `res` (响应) 与 Node 提供的对象完全一致，因此，你可以调用 `req.pipe()`、`req.on('data', callback)` 以及任何 Node 提供的方法

# 一个简单的 Express 路由

这篇教程只是对 Express 路由做一个简单的介绍。路由（Routing）是由一个 URI（或者叫路径）和一个特定的 HTTP 方法（GET、POST 等）组成的，涉及到应用如何响应客户端对某个网站节点的访问。

每一个路由都可以有一个或者多个处理器函数，当匹配到路由时，这个/些函数将被执行。

**定义**

> app.METHOD(PATH, [...HANDLER], HANDLER);

`app` 是一个 `express` 实例；`METHOD` 是某个 [HTTP 请求方式](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)中的一个；`PATH` 是服务器端的路径；`HANDLER` 是当路由匹配到时需要执行的函数。

~~~javascript
// 对网站首页的访问返回 "Hello World!" 字样
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// 网站首页接受 POST 请求
app.post('/', function (req, res) {
  res.send('Got a POST request');
});

// /user 节点接受 PUT 请求
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

// /user 节点接受 DELETE 请求
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
~~~

Express 定义了如下和 HTTP 请求对应的路由方法： `get`, `post`, `put`, `head`, `delete`, `options`, `trace`, `copy`, `lock`, `mkcol`, `move`, `purge`, `propfind`, `proppatch`, `unlock`, `report`, `mkactivity`, `checkout`, `merge`, `m-search`, `notify`, `subscribe`, `unsubscribe`, `patch`, `search`, 和 `connect`。

> 有些路由方法名不是合规的 JavaScript 变量名，此时使用括号记法，比如： `app['m-search']('/', function ...`

`app.all()` 是一个特殊的路由方法，没有任何 HTTP 方法与其对应，它的作用是对于一个路径上的所有请求加载中间件。

在下面的例子中，来自 “/secret” 的请求，不管使用 GET、POST、PUT、DELETE 或其他任何 [http 模块](https://nodejs.org/api/http.html#http_http_methods)支持的 HTTP 请求，句柄都会得到执行。

~~~javascript
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});
~~~

## 路由路径

路由路径和请求方法一起定义了请求的端点，它可以是字符串、字符串模式或者正则表达式。

使用字符串的路由路径示例：

~~~javascript
// 匹配根路径的请求
app.get('/', function (req, res) {
  res.send('root');
});

// 匹配 /about 路径的请求
app.get('/about', function (req, res) {
  res.send('about');
});

// 匹配 /random.text 路径的请求
app.get('/random.text', function (req, res) {
  res.send('random.text');
});
~~~

使用字符串模式的路由路径示例：

~~~javascript
// 匹配 acd 和 abcd
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});

// 匹配 abcd、abbcd、abbbcd等
app.get('/ab+cd', function(req, res) {
  res.send('ab+cd');
});

// 匹配 abcd、abxcd、abRABDOMcd、ab123cd等
app.get('/ab*cd', function(req, res) {
  res.send('ab*cd');
});

// 匹配 /abe 和 /abcde
app.get('/ab(cd)?e', function(req, res) {
 res.send('ab(cd)?e');
});
~~~

> 字符 ?、+、* 和 () 是正则表达式的子集，- 和 . 在基于字符串的路径中按照字面值解释。

使用正则表达式的路由路径示例：

~~~javascript
// 匹配任何路径中含有 a 的路径：
app.get(/a/, function(req, res) {
  res.send('/a/');
});

// 匹配 butterfly、dragonfly，不匹配 butterflyman、dragonfly man等
app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/');
});
~~~

## 路由句柄

可以为请求处理提供多个回调函数，其行为类似 [中间件](http://www.expressjs.com.cn/guide/using-middleware.html)。唯一的区别是这些回调函数有可能调用 `next('route')` 方法而略过其他路由回调函数。可以利用该机制为路由定义前提条件，如果在现有路径上继续执行没有意义，则可将控制权交给剩下的路径。

路由句柄有多种形式，可以是一个函数、一个函数数组，或者是两者混合。

## 响应方法

下表中响应对象（`res`）的方法向客户端返回响应，终结请求响应的循环。如果在路由句柄中一个方法也不调用，来自客户端的请求会一直挂起。

| 方法                                       | 描述                             |
| ---------------------------------------- | ------------------------------ |
| [res.download()](http://www.expressjs.com.cn/4x/api.html#res.download) | 提示下载文件。                        |
| [res.end()](http://www.expressjs.com.cn/4x/api.html#res.end) | 终结响应处理流程。                      |
| [res.json()](http://www.expressjs.com.cn/4x/api.html#res.json) | 发送一个 JSON 格式的响应。               |
| [res.jsonp()](http://www.expressjs.com.cn/4x/api.html#res.jsonp) | 发送一个支持 JSONP 的 JSON 格式的响应。     |
| [res.redirect()](http://www.expressjs.com.cn/4x/api.html#res.redirect) | 重定向请求。                         |
| [res.render()](http://www.expressjs.com.cn/4x/api.html#res.render) | 渲染视图模板。                        |
| [res.send()](http://www.expressjs.com.cn/4x/api.html#res.send) | 发送各种类型的响应。                     |
| [res.sendFile](http://www.expressjs.com.cn/4x/api.html#res.sendFile) | 以八位字节流的形式发送文件。                 |
| [res.sendStatus()](http://www.expressjs.com.cn/4x/api.html#res.sendStatus) | 设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。 |

## app.route()

可使用 `app.route()` 创建路由路径的链式路由句柄。由于路径在一个地方指定，这样做有助于创建模块化的路由，而且减少了代码冗余和拼写错误。请参考 [Router() 文档](http://www.expressjs.com.cn/4x/api.html#router) 了解更多有关路由的信息。

下面这个示例程序使用 `app.route()` 定义了链式路由句柄。

~~~javascript
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });
~~~

# express.Router

可使用 `express.Router` 类创建模块化、可挂载的路由句柄。`Router` 实例是一个完整的中间件和路由系统，因此常称其为一个 “mini-app”。

下面的实例程序创建了一个路由模块，并加载了一个中间件，定义了一些路由，并且将它们挂载至应用的路径上。

在 app 目录下创建名为 `birds.js` 的文件，内容如下：

~~~javascript
var express = require('express');
var router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// 定义网站主页的路由
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// 定义 about 页面的路由
router.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = router;
~~~

然后在应用中加载路由模块：

~~~javascript
var birds = require('./birds');
...
app.use('/birds', birds);
~~~

应用即可处理发自 `/birds` 和 `/birds/about` 的请求，并且调用为该路由指定的 `timeLog` 中间件。