---
layout: post
title: "Unityの插件Liquid Physics 2D目录结构剖析(1)"
categories: [Unity, Unity Plugin]
tags: [Unity, LP2D]
last_updated:
---

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;感谢来自知乎的[指路贴](https://zhuanlan.zhihu.com/p/32099289)的指引，让我顺藤摸瓜发现了如此好用的一个Unity插件—Liquid Physics 2D，一个基于google的[liquidfun](https://github.com/google/liquidfun)的2D流体物理模拟的插件。 刚好我近期的项目要用得到，所以在这里想深入了解LP2D的代码机制。虽说LP2D最后更新的版本是1.3.2，而且已经从Unity Assets上下架，而且我下载的只是盗版的1.1版本…但它依然有很强的学习价值。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;学习轮子是一个很大的工程，为此我会分成几个部分来剖析代码，今天将从整体的运作机制的脚本结构开始。

* Kramdown table of contents
{:toc .toc}
# LiquidPhysics2D

## API

* LPAPIBody.cs 与liquidfun bodies有关的方法
* LPAPIContacts.cs 与liquidfun交互接收(contact listener)有关的方法
* LPAPIFixture.cs 与liquidfun测试物体(fixtures)有关的方法
* LPAPIJoint.cs 与liquidfun关节/连接(joints)有关的方法
* LPAPIParticleGroups.cs 与liquidfun粒子团有关的方法
* LPAPIParticles.cs 与单个或多个liquidfun粒子有关的方法
* LPAPIParticleSystems.cs 与liquidfun粒子系统有关的方法
* LPAPIRaycast.cs 与liquidfun射线(Raycast)有关的方法
* LPAPIShpae.cs 与liquidfun物体形状有关的方法
* LPAPIUtility.cs 与liquidfun物体有关的方法
* LPAPIWorld.cs 与liquidfun世界有关的方法
* PolugonDecomposerAPI.cs 与凸多边形分解算法(Convex decomposition algorithm)有关的方法

## ART

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存放贴图、材质、Shader的地方

* Materials 材质
* Shaders 渲染器
* textures64 贴图纹理

# DataStructs

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存储数据结构基类的地方

* LPContact.cs 包括物体测试信息、粒子的结构体
* LPRayCastHit.cs 包括射线击中物体的结构体

# Documentation

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存放说明文档的地方

# Editor

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存放插件自定义编辑器相关脚本的地方

* LPChainShapeEditor.cs
* LPConvert.cs
* LPFixturePolyEditor.cs
* LPMenu.cs
* LPParticleGroupPolyEditor.cs
* LPParticleSystemEditor.cs
* LPShapeEditor.cs

# ExampleScenes

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;场景样例

# Fixtures

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;放物体相关脚本的地方

* LPFixture.cs
* LPFixtureBox.cs
* LPFixtureChainShape.cs
* LPFixtureCircle.cs
* LPFixturePoly.cs

# Gizmos

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;放编辑器用的小图标的地方

# Joints

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;放连接处相关脚本的地方

* LPJoint.cs
* LPJointDistance.cs
* LPJointFriction.cs
* LPJointGear.cs
* LPJointMouse.cs
* LPJointPrismatic.cs
* LPJointPulley.cs
* LPJointRevolute.cs
* LPJointRope.cs
* LPJointWeld.cs
* LPJointWheel.cs

# Licenses

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;许可...

# ParticleDrawingScripts

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;放粒子显示脚本的地方

* FoamWeightDrawer.cs
* LPDrawParticleSystem.cs
* ThreeColorFoamWeightDrawer.cs
* WeightAndColorDrawer.cs

# Particles

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;放粒子团(ParticleGroup)脚本的地方

* LPParticleGroup.cs
* LPParticleGroupBox.cs
* LPParticleGroupCircle.cs
* LPParticleGroupPoly.cs

# Plugins

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;放跨平台用的插件的地方

* Android
* * libliquidfundll.so
* * x86
* * * libliquidfundll.so
* iOS 里面有一堆`.cpp` `.h`
* liquidfundll.bundle 一个很迷的文件，貌似是个多余的文件，会有文件重复警告
* x86
* * liquidfundll.dll
* x86_64
* * liquidfundll.bundle
* * liquidfundll.dll

# Prefabs

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一堆Prefab和控制Prefab的脚本

* Prefab Scripts


# Shapes

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LP2D多编程工具脚本

* LPShapeCircle.cs
* LPShapeTools.cs

# Textbed

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;测试用的场景

# Others

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;放在根目录下的脚本

* LPBody.cs
* LPColors.cs
* LPContactListener.cs
* LPCorporeal.cs
* LPEnums.cs
* LPManager.cs
* LPParticleGroupMaterial.cs
* LPParticleMaterial.cs
* LPParticleSystem.cs
* LPThing.cs



&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;由于文件实在太多，后续的具体每个脚本的具体作用等我在研究到那个部分的时候再添加修改。

