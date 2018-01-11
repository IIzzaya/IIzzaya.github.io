---
layout: post
title: "VueJs通过Nginx在Ubuntu上的部署"
categories: [Vue.Js, Nginx]
tags: [beginners, nginx, vue.js]
last_updated:
---

* Kramdown table of contents
{:toc .toc}

> 参考[https://www.cnblogs.com/zhouxinfei/p/7862285.html](https://www.cnblogs.com/zhouxinfei/p/7862285.html)

# ssh连接Ubuntu服务器

在bash内输入`$ ssh [name]@[ip]`，[name]为服务器上用户名，[ip]为服务器公网地址，随后会要求输入密码。

# Ubuntu安装nginx

nginx是一个功能非常强大的web服务器加反向代理服务器，同时又是邮件服务器等等

在项目使用中，使用最多的三个核心功能是反向代理、负载均衡和静态服务器 。

`$ sudo apt-get install nginx`

安装完成即可，在/usr/sbin/目录下是nginx命令所在目录，在/etc/nginx/目录下是nginx所有的配置文件，用于配置nginx服务器以及负载均衡等信息。

> 查看nginx进程是否启动
>
> `$ ps -ef|grep nginx`

nginx会自动根据当前主机的CPU的内核数目创建对应的进程数量。

## 启动nginx服务器命令

`$ sudo nginx`

直接执行nginx会按照默认的配置文件`/etc/nginx/nginx.conf`进行服务器的启动。

## 停止nginx服务命令

`$ nginx -s stop` or `$ nginx -s quit`

## 重新启动加载

`$ nginx -s reload` or `$ nginx -s reopen`

## nginx配置

nginx服务器的配置信息主要集中在nginx.conf这个配置文件中，并且所有的可配置选项大致分为以下几个部分：

~~~conf
main                                # 全局配置

events {                            # nginx工作模式配置

}

http {                                # http设置
    ....

    server {                        # 服务器主机配置
        ....
        location {                    # 路由配置
            ....
        }

        location path {
            ....
        }

        location otherpath {
            ....
        }
    }

    server {
        ....

        location {
            ....
        }
    }

    upstream name {                    # 负载均衡配置
        ....
    }
}
~~~

先不用在意具体每个参数设置的细节，我们先聚焦于vuejs服务器的搭建。

> ubuntu下在命令行中的文本编辑可以用到神器vim，简单的介绍一下：
>
> `$ vim [filename]` 用vim以打开filename，会进入到vim界面，默认进入命令模式。
>
> 按`i`进入编辑模式，`esc`退出编辑模式，命令模式下`:q!`退出vim，`:q`不保存文件就退出vim，`:wq`保存并退出。

将main全局配置中的user设置为[name]，[name]为Ubuntu的具有管理员权限的账户。即`user root`之类的。

其他的保持默认，跳转到http内部的server部分。新建一个server

~~~
server {
        listen 7070;
        server_name localhost;


        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        root html;
        }


        root /data/xytest/project/zkview-ui/dist;
        index index.html;


        location / {
        try_files $uri $uri/ @router;
        index index.html;
        }


        location @router {
        rewrite ^.*$ /index.html last;
        }
}
~~~

添加完成后热加载nginx

`$ nginx -s reload`

然后可以通过https://[server address]:[port]访问。