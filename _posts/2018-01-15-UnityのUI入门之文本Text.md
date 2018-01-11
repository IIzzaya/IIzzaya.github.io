---
layout: post
title: "UnityのUI入门之文本Text"
categories: [Unity]
tags: [Unity, UI]
last_updated:
---

* Kramdown table of contents
{:toc .toc}

# Text

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;说到UI，肯定就得提文本（Text），今天介绍下Unity内置的Text类和它的各种调戏方式。先贴官方API，[https://docs.unity3d.com/ScriptReference/UI.Text.html](https://docs.unity3d.com/ScriptReference/UI.Text.html)

> class in UnityEngine.UI  /  Inherits from:UI.<ins>MaskableGraphic</ins>
>
> Implements interfaces:<ins>ICanvasElement</ins>, <ins>IClippable</ins>, <ins>ILayoutElement</ins>, <ins>IMaskable</ins>, <ins>IMaterialModifier</ins>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当然我不可能每个Properties都详细介绍，挑一些比较常用的。

## 描述Description

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;挂在Canvas下，在屏幕上输出字体图像。需要`using UnityEngie.UI;`

## 常用参数Properties

### 文本text

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;显示的内容，`myText.text(String)`，可直接修改。

~~~ c#
    public void ChangeText()
    {
        myText.text = "My name is IIzzaya";
    }
~~~

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;需注意的是，**若字体或者一个单词<ins>超过文本框高度</ins>不会显示**，超过宽度则会自动换行。
> 动态调整字体大小需要用到resizeTextForBestFit(Bool)，将其改为True（默认为False）
> ~~~ c#
>     public void ChangeText()
>     {
>         myText.text = "My name is IIzzaya";
>         myText.resizeTextForBestFit = true;
>     }
> ~~~
> 其次还有配套的
> * resizeTextMaxSize(int) 表自调整最大字号
> * resizeTextMinSize(int) 表自调整最小字号

### 字体font

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;可直接导入`.tff`后缀的字体，拖入`/Assets`即可。 
~~~ c#
public Font myFont;
myText.font = myFont;
~~~

### 字号fontSize

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;即字体大小，可直接修改`myText.fontSize = 16;`。

### 字体样式fontStyle

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`myText.fontStyle(Enum)`，通过`FontStyle`的枚举类型赋值。
~~~ c#
myText.fontStyle = FontStyle.Bold;
//.Normal无 .Bold加粗 .Italic斜体 .BoldAndItalic斜体加粗
~~~

### 行间距lineSpacing

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;字面上的意思，可直接赋值。`myText.lineSpacing = 1`表一倍行间距。

### 对齐alignment

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`myText.alignment(Enum)`，通过`TextAnchor`的枚举类型赋值。分别有九宫格位置，再次不列举了。

### 几何对齐alignmentByGeometry

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`myText.aligenmentByGeometry(Bool)`，意义不明，貌似是开头对齐？

### 水平换行horizontalOverflow

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;枚举类型赋值。Overflow表示不换行并且可以突破宽度限制，Wrap表示自动换行。

### 垂直换行verticalOverflow

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类比水平换行。

### 颜色Color

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;字体的颜色`myText.color(Color/Vector4)`，采用Color类型，实质上是Vector4类型。颜色用RGBA码表示。
> R(RED), G(GREEN), B(BLUE), A(ALPHA透明度)。

~~~ c#
myText.color = new Color(1,1,1,1);
myText.color = new Vector4(1,1,1,1);
myText.color = new Color(1,1,1);//也可省略透明度，默认为1
~~~

> 将html（16进制）颜色代码转换为Color类型的方法
> ~~~ c#
> Color tmp;
> ColorUtility.TryParseHtmlString("#00FFFFFF", out tmp);
> myText.color = tmp;
> ~~~

### 材质material

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`myText.material(Material)`字体的材质。

### 射线目标raycastTarget

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`myText.raycastTarget(Bool)`是否可以被射线选为目标。

## 常用方法Methods
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;无...