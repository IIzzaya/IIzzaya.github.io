---
title: "Unix命令之tail之实时滚动显示log文件"
pubDate: 2018-04-02
description: "Unix shell 提供了一个自带的tail命令，用来显示一个文件（通常是log文件）的最后n行的文档内容。"
tags: [unix, beginners]
---

> [https://www.cnblogs.com/fps2tao/p/7698224.html](https://www.cnblogs.com/fps2tao/p/7698224.html)

Unix shell 提供了一个自带的tail命令，用来显示一个文件（通常是log文件）的最后n行的文档内容。

通常我们在服务器运行程序时需要用到这个命令来监控和查询服务端的运行日志。

~~~bash
$ tail -f ***.log
~~~

