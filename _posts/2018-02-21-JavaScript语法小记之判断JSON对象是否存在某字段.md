---
layout: post
title: "JavaScript语法小记之判断JSON对象是否存在某字段"
categories: [Javascript]
tags: [beginners]
last_updated:
---

# 判断是否为JSON对象

~~~javascript
if(typeof(data) == "object" && Object.prototype.toString.call(data).toLowerCase() == "[object object]" && !data.length)
  console.log("is JSON Object");
~~~

# 判断是否存在某字段

~~~javascript
console.info(data["key"] != undefined); //此方式不严谨，如果key定义了 并就是赋值为undefined 则会出问题
console.info("key" in data);
console.info(data.hasOwnProperty("key"));
~~~

