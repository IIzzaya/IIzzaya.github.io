---
layout: post
title: "Unityの插件Liquid Physics 2D脚本结构剖析(2)"
categories: [Unity, UnityPlugin]
tags: [Unity, LP2D]
last_updated:
---

* Kramdown table of contents
{:toc .toc}

# **MonoBehaviour**

## **LPThing**


- 抽象基类

- 是bodies、fixtures、joints、particle groups的父类

### **LPCorporeal**

- 抽象基类

- 所有多边形物体的基类

#### **LPFixture**

- 抽象基类

- LF模拟系统中的构件基类

##### **LPFixtureBox**

  - 实类

  - 矩形构件

##### **LPFixtureCircle**

  - 圆形构件

  - 实类

##### **LPFixturePoly**

  - 多边形构件

  - 实类

##### **LPFixtureChainShape**

  - 实类

  - 链状构件

#### **LPParticleGroup**

- 抽象基类

- 在liquidfun模拟中呈现粒子团

##### **LPParticleGroupCircle**

  - 实类

  - 圆形粒子团

##### **LPParticleGroupBox**

  - 实类

  - 矩形粒子团

##### **LPParticleGroupPoly**

  - 实类

  - 多边形粒子团

### **LPJoint**

- 抽象基类

- LF模拟系统中的结点基类

#### **LPJointDistance**

- 杆

- 实类

#### **LPJointFriction**

- 在两个物体间添加摩擦力

- 实类

#### **LPJointGear**

- 齿轮

- 实类

#### **LPJointMouse**

- A向B拖拽

- 实类

#### **LPJointPrismatic**

- 将物体向一个方向推动

- 实类

#### **LPJointPulley**

- 动滑轮

- 实类

#### **LPJointRevolute**

- 马达

- 实类

#### **LPJointRope**

- 绳子

- 实类

#### **LPJointWheel**

- 轮子

- 实类

#### **LPJointWeld**

- 焊接点

- 实类

### **LPBody**

- 实类

- 构件的基础属性


## **LPTarget**


- 实类

- 被瞄准的目标

## **LPAimer**


- 抽象基类

- 具有瞄准属性

### **LPSpawner**

- 抽象基类

- 具有动态生成属性

#### **LPParticleSpawner**

- 实类

- 粒子生成器

## **LPParticleSystem**


- 实类

- 呈现并且控制liquidfun粒子系统


## **RaycasterPoint**


- 实类

- Raycaster的点


## **LPManager**


- 实类

- 呈现并且控制liquidfun物理模拟世界，需要附在场景里的实物上


## **LPDrawParticleSystem**


- 实类

- 运用Unity的粒子特效来绘制粒子。该模块被独立出来可以用其他的绘制器来替换。

### **WeightAndColorDrawer**

- 实类

- 权重和色彩计算

### **ThreeColorFoamWeightDrawer**

- 实类

- 粒子边缘色彩权重计算

### **FoamWeightDrawer**

- 实类

- 粒子边缘权重计算

## **LPMenu**


- 实类

- - 在Unity菜单中添加LP菜单


## **LPConvert**


- 实类

- 在菜单添加转换，将Unity自带Collider转化为LP中的构件


## **LPRayCaster**


- 实类

- 生成射线








# **Editor**


## **LPShapeEditor**

- 实类

- 编辑器绘制多边形物体

### **LPParticleGroupPolyEditor**

- 实类

- 编辑器绘制多边形粒子团

### **LPChainShapeEditor**

- 实类

- 编辑器绘制链状物体

### **LPFixturePolyEditor**

- 实类

- 编辑器绘制多边形构件


## **LPParticleSystemEditor**

- 实类

- 可自定义粒子系统


# **LPEnums**


- 各种枚举


# **LPContactListener**


- 实类

- 储存交互的信息



# **LPColors**


- 静态类

- 编辑器用的绘图颜色




# **LPShapeCircle**


- 静态类

- 储存编辑器中圆的信息


# **ScriptableObject**


## **LPParticleMaterial**

- 实类

- 设置粒子属性

## **LPParticleGroupMaterial**

- 实类

- 设置粒子团属性



# **LPShapeTools**


- 静态类

- 储存形状信息



# **LPSystemFixPartContact**


- 结构体

- 储存粒子与物体交互信息


# **LPParticle**


- 实类

- 储存单个粒子信息


# **LPSystemPartPartContact**


- 结构体

- 储存粒子间交互信息


# **LPContact**


## **LPContactFixFix**

- 结构体

- 储存构件之间交互信息

## **LPContactPartFix**

- 结构体

- 储存构件与粒子交互信息

## **LPContactPartPart**

- 结构体

- 储存粒子与粒子交互信息


