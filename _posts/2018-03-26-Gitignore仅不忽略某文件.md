---
layout: post
title: "Gitignore仅不忽略某文件"
categories: [Git]
tags: [beginners]
last_updated:
---

> 官方文档[https://mirrors.edge.kernel.org/pub/software/scm/git/docs/gitignore.html](https://mirrors.edge.kernel.org/pub/software/scm/git/docs/gitignore.html)
>
> [https://blog.csdn.net/CalShell/article/details/52670175](https://blog.csdn.net/CalShell/article/details/52670175)

根目录下文件不忽略可以这样

~~~
/*
!a.java
~~~

如果不是在根目录下，比如 /a/b.java，设置这样一个文件不被忽略，却是没有用：

~~~
/*
!/a/b.java
~~~

不忽略 /a/b.java 应该这样写：

~~~
/*
!/a
/a/*
!/a/b.java
~~~

