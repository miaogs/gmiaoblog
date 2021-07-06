---
title: QT+MSVC2019+VS Code
date: 2021-07-06 03:25:33
tags:
---


<!-- # Hexo + GitHub 个人博客搭建教程 -->

最近突然想用 `QT` 写个比较简单的工具了。 本来是想用 PyQT 直接写的。 但是自己想学习一下 C++ 。所以这里就还是使用 `QT Creater` .

<!-- more -->


## <span id="jumpto1">[1. QT 简介](#1)</span>


## <span id="jumpto2">[2. QT Creater](#2)</span>

QT Creater

[官方通道](https://download.qt.io/)

[清华大学镜像](https://mirrors.tuna.tsinghua.edu.cn/qt/official_releases/online_installers/)

<img src="https://gitee.com/miaogs/blog_image/raw/master/07061528129.png" style="zoom:100%" div align=center />



## <span id="jumpto3">[3. QT Creater 安装](#3)</span>

这里使用[清华大学镜像](https://mirrors.tuna.tsinghua.edu.cn/qt/official_releases/online_installers/)下载 `qt-unified-windows-x86-online.exe`。

双击安装，一直 `next`。

<img src="https://gitee.com/miaogs/blog_image/raw/master/07051638136.png" style="zoom:100%" div align=center />

这里我选择的是 `QT6.1.2`,默认全选。也可以根据自己的需要勾选。当然了 `MSVC2019` 是必须需要勾选的。

<img src="https://gitee.com/miaogs/blog_image/raw/master/07051639137.png" style="zoom:100%" div align=center />

后面就是漫长的等待。

<img src="https://gitee.com/miaogs/blog_image/raw/master/07051640138.png" style="zoom:100%" div align=center />

## <span id="jumpto4">[4. 添加MSVC编译环境 ](#4)</span>


在[3. QT Creater 安装](#jumpto3) 中，可以确认勾选的 `MSVC` 版本是 `MSVC201964-bit` 。

添加 `MSVC` 编译环境有两种方法，第一种是直接安装 `Visual Studio 2019`。 这个方法比较简单但是比较耗时。还可能涉及到 `license`。
第二种方法是 安装 `Microsoft Visual C++ Redistributable for Visual Studio 2019`(此程序包安装 `Visual C++` 库的运行时组件，
并且可以用于在计算机上运行此类应用程序，即使该计算机没有安装 `Visual Studio 2019` 。) 和 `Build tools for Visual Studio`(`Visual Studio` 生成工具) 。


在 `Visual Studio 2019` 的 [官方下载页面](https://visualstudio.microsoft.com/zh-hans/downloads/)最下方找到“所有下载”。


<img src="https://gitee.com/miaogs/blog_image/raw/master/07061918132.png" style="zoom:100%" div align=center />


在 “ `Visual Studio 2019` 工具” 里面找到 `Visual Studio 2019` 生成工具并下载。

<img src="https://gitee.com/miaogs/blog_image/raw/master/07061928133.png" style="zoom:100%" div align=center />


其次，在 “其他工具和框架” 中找到 `Microsoft Visual C++ Redistributable for Visual Studio 2019`，选择 `x64`，最后下载。

<img src="https://gitee.com/miaogs/blog_image/raw/master/07061930134.png" style="zoom:100%" div align=center />


下载完毕之后，首先安装 `Microsoft Visual C++ Redistributable for Visual Studio 2019`，一直 `next` 即可。

然后再安装 `Build tools for Visual Studio`，勾选 “C++ 生成工具”，右侧可选部分默认即可。此安装需要联网。

<img src="https://gitee.com/miaogs/blog_image/raw/master/07061008122.png" style="zoom:100%" div align=center />


后面就是漫长的等待了。

<img src="https://gitee.com/miaogs/blog_image/raw/master/07061010123.png" style="zoom:100%" div align=center />


科学上网也需要很久才能下载安装成功。

<img src="https://gitee.com/miaogs/blog_image/raw/master/07061007121.png" style="zoom:100%" div align=center />

有没有离线下载的方式呢？

答案是有的。

假设当前下载的 `Build tools for Visual Studio` 版本是 `vs_buildtools__2085667014.1609387467.exe` ，并存放在用户的 `Download` 目录上。

执行以下命令：

```
vs_buildtools__2085667014.1609387467.exe /Layout ./visualcpp
```

`visualcpp` 是我新建的用于存放离线安装包的。

<img src="https://gitee.com/miaogs/blog_image/raw/master/07062012139.png" style="zoom:100%" div align=center />


之后， 选择 `continue`

<img src="https://gitee.com/miaogs/blog_image/raw/master/07062012140.png" style="zoom:100%" div align=center />

与在线安装的方式的区别是，这次下载的安装包会存放在 `visualcpp` 文件夹中。

<img src="https://gitee.com/miaogs/blog_image/raw/master/07062013142.png" style="zoom:100%" div align=center />






