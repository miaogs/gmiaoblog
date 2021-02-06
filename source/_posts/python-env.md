---
title: python-env
date: 2021-02-06 20:54:14
tags:
---

`MAC` 电脑环境和 `Linux` 环境又有一点不一样。这里简单记录一下。

<!-- more -->


## <span id="jumpto1"> [1. MAC 本身自带的Python版本](#1) </span>

系统自带的 `Python2.7` 安装在 `/System/Library/Frameworks/Python.framework/` 目录下面。
我们用命令行启动的时候直接指向了系统默认 `Python2.7` 的快捷方式 `/usr/bin/python` 。

所以，我们输入 `python` 的时候，是 `python2.7` .

## <span id="jumpto2"> [2. brew 简介](#2) </span>




## <span id="jumpto3"> [3. 使用 brew 安装 python3](#3) </span>

可以直接以下命令安装最新的 `python`  版本：

``` bash
brew install python3
```

比如，我在当前的最新版本是 python3.9 。

安装的路径会在执行日志中体现出来：

```
Python has been installed as
  /usr/local/bin/python3
```

当然了，如果你想指定 `python` 的安装版本。可以先查询一下 `brew` 支持那些版本：

``` bash
brew search python3@
```

以下是我的执行结果：

```
$: brew search python3@
==> Formulae
boost-python3       python@3.7          python@3.8          python@3.9
$:
```
可以看到可选的有 `python3.7` , `python3.8` , `python3.9` 。这里我选择安装 `python3.7` .

执行以下命令：

```
brew install python@3.7
```

指定版本的安装路径会和刚才的不同：

```
Python has been installed as
  /usr/local/opt/python@3.7/bin/python3
```



## <span id="jumpto3"> [3. 使用 brew 卸载 python3](#3) </span>

如果是使用 brew 安装的 python,那么卸载就非常简答。

卸载最新版本：

```
brew unstall python3
```

卸载指定版本：
```
brew install python@3.7
```

## <span id="jumpto4"> [4. 修改 MAC 默认的 Python 版本](#4) </span>

直接说怎么改吧。

修改 `.bash_profile`

```
vim ~/.bash_profile
```

以 [3. 使用 brew 安装 python3](#jumpto3) 步骤中安装的为例：

添加以下内容：

```
#如果直接 brew install python3 ，安装的是最新的版本。应该是这个路径
#alias python="/usr/local/bin/python3"

#使用brew install python@3.7指定了安装的版本(python3.7)
alias python="/usr/local/opt/python@3.7/bin/python3"

#如果直接 brew install python3 ，安装的是最新的版本。 应该是这个路径
#alias pip="/usr/local/bin/pip3"

#使用brew install python@3.7指定了安装的版本(python3.7)
alias pip="/usr/local/opt/python@3.7/bin/pip3"

```

保存退出之后，执行 `source ~/.bash_profile`


这个时候输入 `python --version` 查看 `python` 的版本是不是切换到了 `python3`.

多说一句，修改 `.bash_profile` 文件只会对当前终端窗口有效，如果需要全局生效，需要修改 `./zshrc`文件。修改内容一样。

还有一种方法：

在[1. MAC 本身自带的Python版本](#jumpto1) 说到为什么 `MAC` 默认是 `python2.7` 。  
所以，我们将我们将我们自己安装的 python3(假设路径是 `/usr/local/bin/python3` )软连接到 `usr/bin/python` 即可。

```
sudo ln -s /usr/local/bin/python3 /usr/bin/python
```


## <span id="jumpto5> [5. MAC 配置环境变量](#5) </span>

`MAC` 修改环境变量总结
1. `/etc/profile`
全局（公有）配置，不管是哪个用户，登录时都会读取该文件。所以一般不建议修改。

2. `/etc/bashrc`
全局（公有）配置，`bash shell` 执行时，不管是何种方式，都会读取此文件。 一般这里添加的是系统级环境变量。

3. `~/.bash_profile` （一般在这个文件中添加用户级环境变量）
每个用户都可使用该文件输入专用于自己使用的shell信息,当用户登录时,该文件仅仅执行一次! 所以这是用户自己的。可以和别的用户配置不一样。
但是有时在 `.bash_profile` 文件中的环境变量并没有起到作用
这时可以查看使用的 `Mac`是什么样的 `Shell`
```
➜  ~ echo $SHELL
/bin/zsh

```

另外，当 `Mac` 上安装了 `zsh` 后，修改环境变量就需要在 `~/.zshrc` 中修改，比如加入代理：

需要执行 `source /.bash_profile` 想要修改立即生效.

