---
layout: post
title: "MongoDB在mac下的安装和启停"
categories: [DataBase]
tags: [beginners, MongoDB]
last_updated:
---

> 参考 [http://blog.csdn.net/fangxiaoji/article/details/45228555](http://blog.csdn.net/fangxiaoji/article/details/45228555)

# 启动
* 在[mongoDB官网](https://www.mongodb.org/downloads)下载安装包。
* 拷贝解压后的文件夹到你想安装的目录。
* `cd` 至你安装的目录。
* 创建数据库文件 `sudo mkdir -p /data/db`。
* 给文件赋权限 `sudo chown -R 你的计算机用户名/data `。
* 以后便可以直接运行`/bin/mongod`开启数据库服务端。


# 关闭

* 运行`/bin/mongo`执行文件，该程序是控制mongo的shell。
* 使用admin用户来关闭mongoDB`use admin`；`db.shutdownServer()`。

