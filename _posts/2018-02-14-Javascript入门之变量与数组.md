---
layout: post
title: "Javascript入门之变量与数组"
categories: [Javascript]
tags: [es6, javascript, beginners, webdev, programming]
last_updated:
---

* Kramdown table of contents
{:toc .toc}
> es6语法规则下

# var & let & const

## var 变量

(variable)对大小写敏感，自动识别类型

~~~javascript
var x; //不赋值的话相当于 var x = undefined;
var y = 1;
var z = 2*y;
var name = "iizzaya";
var Name = 'IIzzaya'; //单引号双引号均可
var answer = "Yes";
~~~

可以在同一条语句中声明多个变量

~~~javascript
var name="Gates", age=56, job="CEO";
~~~

声明可以多行

~~~javascript
var name="Gates",
    age=56,
    job="CEO";
~~~

## let 局部变量

与var差不多，不过仅在一个区块中有定义（一般以 {}区分）。

~~~javascript
if (true)
{
  let a = 50;
  console.log(a); // 50
}
console.log(a); // undefined
~~~

另一个例子:

~~~javascript
let a = 50;
let b = 100;
if(true)
{
  let a = 60;
  var c = 10;
  console.log(a/c); // 6
  console.log(b/c); // 10
}
console.log(c); // 10
console.log(a); // 50
~~~

## const 常量

字面上的意思。

~~~javascript
const a = 50;
a = 60; // shows error. You cannot change the value of const.
const b = "Constant variable";
b = "Assigning new value"; // shows error.
//Consider another example.
const LANGUAGES = ['Js', 'Ruby', 'Python', 'Go'];
LANGUAGES = "Javascript"; // shows error. 
LANGUAGES.push('Java'); // Works fine.
console.log(LANGUAGES); // ['Js', 'Ruby', 'Python', 'Go', 'Java']
~~~

# Array

## define 数组声明

~~~javascript
const size = 3;
var myArray = new Array(size);
var myArray2 = new Array('A','B','C');
var myArray3 = ['A','B','C'];
myArray3[0] = 'D';
~~~

## properties 对象属性

### constructor 

返回对创建此对象的数组函数的引用。

~~~javascript
var test=new Array();

if (test.constructor==Array)
  document.write("This is an Array");
if (test.constructor==Boolean)
  document.write("This is a Boolean");
if (test.constructor==Date)
  document.write("This is a Date");
if (test.constructor==String)
  document.write("This is a String");
//Output: This is an Array
~~~

~~~javascript
function employee(name,job,born)
{
  this.name=name;
  this.job=job;
  this.born=born;
}

var bill=new employee("Bill Gates","Engineer",1985);

document.write(bill.constructor);
//Output:
//function employee(name, job, born)
//{this.name = name; this.job = job; this.born = born;}
~~~


### length

设置或返回数组中元素的数目。

### prototype

属性使您有能力向对象添加属性和方法。

~~~javascript
function employee(name,job,born)
{
this.name=name;
this.job=job;
this.born=born;
}

var bill = new employee("Bill Gates","Engineer",1985);

employee.prototype.salary=null;
bill.salary=20000;

document.write(bill.salary);
//Output: 20000
~~~

## functions 对象方法

### concat() 连接多个数组

该方法不会改变现有的数组，而仅仅会返回<ins>被连接数组的一个副本</ins>。

**语法**

> ```
> arrayObject.concat(arrayX,arrayX,......,arrayX);
> ```

**返回值**

被连接数组的一个副本

~~~javascript
var a = [1,2,3];
document.write(a.concat(4,5));
//Output: 1,2,3,4,5
~~~

### join() 输出字符串

join() 方法用于把数组中的所有元素放入一个字符串。

元素是通过指定的分隔符进行分隔的。

**语法**

> ```
> arrayObject.join(separator);
> separator:可选。指定要使用的分隔符。如果省略该参数，则使用逗号作为分隔符。
> ```

**返回值**

字符串

~~~javascript
var arr = ["A","B","C"];

document.write(arr.join());
//Output: A,B,C
document.write(arr.join("."));
//Output: A.B.C
document.write(arr.join(""));
//Output: ABC
~~~

### pop() 最后一个元素出栈

用于删除并返回数组的最后一个元素。与之对应的为shift()

**语法**

> ```
> arrayObject.pop();
> ```

**返回值**

最后一个元素，长度减1，如果数组已经为空，则 pop() 不改变数组，并返回 undefined 值。

### push() 向数组末尾添加元素

方法可向数组的**末尾**添加一个或多个元素，并返回新的长度。

**语法**

> ```
> arrayObject.push(newelement1,newelement2,....,newelementX);
> ```

**返回值**

把指定的值添加到数组后的新长度。

### reverse() 颠倒数组中元素的顺序

方法用于颠倒数组中元素的顺序。

**语法**

> ```
> arrayObject.reverse();
> ```

### shift() 第一个元素出栈

方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。

**语法**

> ```
> arrayObject.shift();
> ```

**返回值**

数组原来的第一个元素的值。如果数组是空的，那么 shift() 方法将不进行任何操作，返回 undefined 值。请注意，该方法不创建新数组，而是直接修改原有的 arrayObject。

### slice() 返回一段数组

方法可从已有的数组中返回选定的元素。

**语法**

> ```
> arrayObject.slice(start,end);
> start:必需。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推。
> end:可选。规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素。
> ```

**返回值**

返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。请注意，该方法并不会修改数组，而是返回一个子数组。如果想删除数组中的一段元素，应该使用方法 Array.splice()。

### sort() 排序

方法用于对数组的元素进行排序。

**语法**

> ```
> arrayObject.sort(sortby)
> sortby:可选。规定排序顺序。必须是函数。
> ```

**返回值**

对数组的引用。请注意，数组在原数组上进行排序，不生成副本。

如果调用该方法时没有使用参数，将按字母顺序对数组中的元素进行排序，说得更精确点，是按照**字符编码**的顺序进行排序。要实现这一点，首先应把数组的元素都转换成字符串（如有必要），以便进行比较。

如果想按照其他标准进行排序，就需要提供比较函数，该函数要比较两个值，然后返回一个用于说明这两个值的相对顺序的数字。比较函数应该具有两个参数 a 和 b，其返回值如下：

- 若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。
- 若 a 等于 b，则返回 0。
- 若 a 大于 b，则返回一个大于 0 的值。

按字母顺序进行排序例子:

~~~javascript
var arr = new Array(6);
arr[0] = "George";
arr[1] = "John";
arr[2] = "Thomas";
arr[3] = "James";
arr[4] = "Adrew";
arr[5] = "Martin";

document.write(arr + "<br />");
document.write(arr.sort());
//Output:
//George,John,Thomas,James,Adrew,Martin
//Adrew,George,James,John,Martin,Thomas
~~~

一个数字排序例子：

~~~javascript
var arr = [10,5,40,25,1000,1];

document.write(arr + "<br />");
document.write(arr.sort());
//Output:
//10,5,40,25,1000,1
//1,10,1000,25,40,5

function sortNumber(a,b)
{
return a - b
}
document.write(arr.sort(sortNumber).join("-"));
//Output:
//1-5-10-25-40-1000
~~~

### splice() 添加/删除一段数组

方法向/从数组中添加/删除项目，然后返回被删除的项目。

**语法**

> ```
> arrayObject.splice(index,howmany,item1,.....,itemX);
> index:必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
> howmany:必需。要删除的项目数量。如果设置为 0，则不会删除项目。
> item1, ..., itemX:可选。向数组添加的新项目。
> ```

**返回值**

被删除项目的新数组，如果有的话。splice() 方法可删除从 index 处开始的零个或多个元素，并且用参数列表中声明的一个或多个值来替换那些被删除的元素。

如果从 arrayObject 中删除了元素，则返回的是含有被删除的元素的数组。

添加一个元素的例子:

~~~javascript
var arr = [1,2,3,4];

document.write(arr + "<br />");
arr.splice(2,0,"5");
document.write(arr + "<br />");
//Output:
//1,2,3,4
//1,2,5,3,4
arr.splice(2,1,"6");
document.write(arr + "<br />");
//1,2,6,3,4
~~~

### unshift() 队头入栈

方法可向数组的开头添加一个或更多元素，并返回新的长度。

**语法**

> ```
> arrayObject.unshift(newelement1,newelement2,....,newelementX);
> ```

**返回值**

arrayObject 的新长度。

unshift() 方法不创建新的创建，而是直接修改原有的数组。



## 二维数组的声明方法

~~~javascript
var arr = [[1,2,4,6],[2,4,7,8],[8,9,10,11],[9,12,13,15]];
//arr[2][3] 为 11
var arr2 = [[1,2],['a','b']];
var arr3 = new Array(new Array(1,2),new Array("a","b"));
//二维数组的声明
var arr4 = new Array();         //先声明一维
for(var i=0;i<5;i++){          //一维长度为5
  arr4[i]=new Array(i);    //在声明二维
  for(var j=0;j<5;j++){      //二维长度为5
  arr4[i][j]=i;
}
~~~

