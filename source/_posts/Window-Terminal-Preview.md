---
title: Window Terminal 安装以及使用
date: 2021-02-16 15:44:53
tags:
---

你还在使用 `Window` 的默认终端吗？
用过 `Window` 默认终端的都知道，真的太丑、太烂、太落伍。
微软也逐渐意识到这个问题，并在 `Build2019` 大会上发布了 新一代 `Window` 终端程序：`Window Terminal` 。

<!-- more -->

## <span id="jumpto1">[1. 简介](#1)</span>

第一代产品不没有实现预期的功能，甚至有些严重性的功能缺陷。
但是随着 `Window Terminal` 的不断更新(目前已经到了 `v1.6.10412.0`)，个人觉得已经是一个比较不错的的终端了。
支持许多功能诸如：
- 支持各种 `Shell`的配置文件 ,例如命令行工具、命令提示符、`PowerShell` 、`WSL2` ( `Linux` 子系统)等等
- 支持自定义主题、样式方案和配置，支持多种配色方案和设置
- 自定义操作，支持使用多种自定义命令，可以修改默认的键盘快捷方式
- 可以显示 `Unicode` 和 `UTF-8` 字符，支持各种语言的表情符号和字符
- 支持 `GPU` 加速文本呈现，提供比默认 `Windows` 命令行体验更好的性能
- 支持背景图像, `Window Terminal` 窗口中显示背景图像和 `gif` ，[配置文件-外观](https://docs.microsoft.com/zh-cn/windows/terminal/customize-settings/profile-appearance#background-image)
- 命令行参数，可以使用命令行参数将 `Window Terminal` 设置为在特定配置中启动
- 快速高效，并且不会占用太多的内存和电量(这个很重要哦)

## <span id="jumpto2">[2. 安装](#2)</span>

目前有两个版本，一个是 `Window Terminal` ,另一个是 `Window Terminal Preview` 。
区别在于 `Window Terminal Preview` 版本类似于开发工程版，但是还没有正式 `Release` , 所以两个版本都可以安装。

安装方法有很多，比如可以直接从 [Microsoft Store](https://www.microsoft.com/en-us/p/windows-terminal/9n0dx20hk701?rtc=1&activetab=pivot:overviewtab) 下载安装。

如果你无法访问 `Microsoft Store`，[`GitHub` 发布页](https://github.com/microsoft/terminal/releases)上发布有内部版本。 如果从 `GitHub` 安装，`Window Terminal` 将不会自动更新为新版本。

或者通过 `Window` 的软件包工具 [winget](https://github.com/microsoft/winget-cli) (全称： `Windows Package Manager Client` )安装，类似 `Linux` 的 `apt-get` .

```bash
winget install --id=Microsoft.WindowsTerminal -e
```

## <span id="jumpto3">[3. 启动](#3)</span>

安装后打开 `Windows Terminal` 时，它会在打开的选项卡中通过 `PowerShell` 作为默认配置文件启动。

<img src="https://gitee.com/miaogs/blog_image/raw/master/first-run.png" style="zoom:30%" div align=center />


**支持动态配置文件**

如果安装了多个 `shell` , `Window terminal` 会自动创建配置文件。

**打开新选项卡**

可以按 `ctrl+shift+t` 或直接选择窗口上方 `+`（加号）按钮，打开默认配置文件的新选项卡。 若要打开其他配置文件，请选择 `+` 按钮旁的 `˅`（箭头）打开下拉菜单。 然后可以从中选择要打开的配置文件。

**打开新窗格**

可以使用窗格并行运行多个 `shell` 。 若要打开窗格，可以使用 `alt+shift+d` 。 此键绑定将打开焦点配置文件的重复窗格。

**配置**

若要自定义 `Windows Terminal` 的设置，请在下拉菜单中选择 “setting”。 这会在默认文本编辑器中打开 `settings.json` 文件。 （默认文本编辑器在 [Windows](ms-settings:defaultapps) 设置 中定义。）
`Windows Terminal` 支持自定义影响整个应用程序的全局属性、影响每个配置文件的设置的配置文件属性以及允许你使用键盘与 `Windows Terminal` 交互的键绑定。

如果需要更深入的配置可以查看[12. 自定义配置](#jumpto12)。

### <span id="jumpto4">[4 配色方案](#4)</span>

### <span id="jumpto41">[4.1 创建自己的配色方案](#4.1)</span>

可以在 `settings.json` 文件的 `schemes` 数组中定义配色方案。 它们是使用以下格式写入的：

```json
{
    "name" : "Campbell",

    "cursorColor": "#FFFFFF",
    "selectionBackground": "#FFFFFF",

    "background" : "#0C0C0C",
    "foreground" : "#CCCCCC",

    "black" : "#0C0C0C",
    "blue" : "#0037DA",
    "cyan" : "#3A96DD",
    "green" : "#13A10E",
    "purple" : "#881798",
    "red" : "#C50F1F",
    "white" : "#CCCCCC",
    "yellow" : "#C19C00",
    "brightBlack" : "#767676",
    "brightBlue" : "#3B78FF",
    "brightCyan" : "#61D6D6",
    "brightGreen" : "#16C60C",
    "brightPurple" : "#B4009E",
    "brightRed" : "#E74856",
    "brightWhite" : "#F2F2F2",
    "brightYellow" : "#F9F1A5"
},
```


除 `name` 以外，每个设置都接受十六进制格式（ `"#rgb"` 或 `"#rrggbb"` ）的字符串形式的颜色。 `cursorColor` 和 `selectionBackground` 设置是可选的。

### <span id="jumpto442">[4.2 包含的配色方案](#4.2)</span>

`Windows terminal` 将这些配色方案包含在 `defaults.json` 文件中，可按住 `alt` 并选择设置按钮来访问该文件。 如果要在一个命令行配置文件中设置配色方案，可以在`settings.json` 文件中添加 `colorScheme` 属性，并将配色方案的 `name` 作为值。


支持的方案有很多。

**Campbell**

<img src="https://gitee.com/miaogs/blog_image/raw/master/campbell-color-scheme.png" style="zoom:30%" div align=center alt="show"/>

**Campbell Powershell**

<img src="https://gitee.com/miaogs/blog_image/raw/master/campbell-powershell-color-scheme.png" style="zoom:30%" div align=center alt="show"/>

**Vintage**

<img src="https://gitee.com/miaogs/blog_image/raw/master/vintage-color-scheme.png" style="zoom:30%" div align=center alt="show"/>

**One Half Dark**

<img src="https://gitee.com/miaogs/blog_image/raw/master/vintage-color-scheme.png" style="zoom:30%" div align=center alt="show"/>


**One Half Light**

<img src="https://gitee.com/miaogs/blog_image/raw/master/one-half-light-color-scheme.png" style="zoom:30%" div align=center alt="show"/>

**Solarized Dark**

<img src="https://gitee.com/miaogs/blog_image/raw/master/solarized-dark-color-scheme.png" style="zoom:30%" div align=center alt="show"/>

**Solarized Light**

<img src="https://gitee.com/miaogs/blog_image/raw/master/solarized-light-color-scheme.png" style="zoom:30%" div align=center alt="show"/>

**Tango Dark**

<img src="https://gitee.com/miaogs/blog_image/raw/master/tango-dark-color-scheme.png" style="zoom:30%" div align=center alt="show"/>

**Tango Light**

<img src="https://gitee.com/miaogs/blog_image/raw/master/tango-light-color-scheme.png" style="zoom:30%" div align=center alt="show"/>



### <span id="jumpto5">[5. 配置文件简单说明](#5)</span>

下面列出的设置特定于每个唯一的配置文件。 如果要将设置应用于所有配置文件，则可以将其添加到 `settings.json` 文件中配置文件列表上方的 `"default"` 部分。

```json
"defaults":
{
    // SETTINGS TO APPLY TO ALL PROFILES
},
"list":
[
    // PROFILE OBJECTS
]
```

### <span id="jumpto551">[5.5.1 常规配置](#5.5.1)</span>

- `Name` : 这是将在下拉菜单中显示的配置文件的名称。 此值还用作启动时传递给 `shell` 的“标题”。也可以使用 `tabTitle` 覆盖此“标题”行为。
- `Command line` : 配置文件中使用的可执行文件。
- `Starting directory` : `shell` 程序在加载时开始的目录
- `Icon` : 设置显示在选项卡，下拉菜单，跳转列表和选项卡切换器中的图标。
- `Tab title` : 如果设置，它将替换名称作为标题，以在启动时传递给 `shell`
- `Hide` : 如果将 `hidden` 设置为 `true` ，则配置文件将不会出现在配置文件列表中。 这可用于隐藏默认配置文件和动态生成的配置文件，同时将它们保留在设置文件中。

关于 `Starting directory` 需要注意的是其默认行为：如果未指定 `startingDirectory` 值，则根据启动终端的位置，获得不同的结果：

- 从“开始”菜单运行 `Windows Terminal `：`C：\ windows \ system32`
- 从“开始”菜单运行 `wt.exe` ：`C：\ windows \ system32`
- 从 `Win + R` 运行 `wt.exe` ：`%USERPROFILE%`
- 从资源管理器地址栏中运行 `wt.exe` : 正在查看的文件夹路径。


### <span id="jumpto452">[5.5.2 快捷键](#5.5.2)</span>

**不携带参数的动作格式：**

```json
{ "command": "commandName", "keys": "modifiers+key" }
```

例如，此默认设置使用快捷键 `alt + f4` 关闭终端窗口：

```json
{ "command": "closeWindow", "keys": "alt+f4" }
```

**携带参数的动作格式：**

```json
{ "command": { "action": "commandName", "argument": "value" }, "keys": "modifiers+key" }
```

例如，此默认设置使用快捷键 `ctrl + shift + 1` 来根据在下拉菜单中首先列出的配置文件在终端中打开新选项卡（默认会打开 `PowerShell` 配置文件）：

```json
{ "command": { "action": "newTab", "index": 0 }, "keys": "ctrl+shift+1" }
```



## <span id="jumpto6">[6. 使用命令行参数](#6)</span>

可以使用` wt.exe` 从命令行打开 `Windows Terminal` 的新实例。 还可以改为使用执行别名 `wt` .

有关语法使用可以官方文档 [命令行参数语法](https://docs.microsoft.com/zh-cn/windows/terminal/command-line-arguments?tabs=windows).



<img src="https://media.giphy.com/media/7vfUXj4qFCQQuuXio7/giphy.gif" style="zoom:100%" div align=center alt="show"/>


## <span id="jumpto7">[7. 命令面板](#7)</span>

假设需要使用 `Ctrl+Shift+P` 来打开命令面板。

在 `setting.json` 文件中，添加以下内容：

```json
{ "command": "commandPalette", "keys": "ctrl+shift+p" }
```


这样就可以通过 `Ctrl+Shift+P` 打开命令面板，命令面板支持命令行输入。

<img src="https://media.giphy.com/media/CnRK0CmkKNxP3F99BX/giphy.gif" style="zoom:100%" div align=center alt="show"/>


## <span id="jumpto8">[8. 搜索](#8)</span>

`Windows Terminal` 附带一项搜索功能，可用于在文本缓冲区中查找特定关键字。 当尝试查找之前运行的命令或特定文件名时，这非常有用。

**方向搜索**

<img src="https://media.giphy.com/media/hJ0LpwRyqxfmAwpm42/giphy.gif" style="zoom:100%" div align=center alt="show"/>

**大小写匹配搜索**

<img src="https://media.giphy.com/media/MdCxAwD9T3WeTx9L70/giphy.gif" style="zoom:100%" div align=center alt="show"/>

**在窗格中搜索**

<img src="https://media.giphy.com/media/kOR3kmVQf6OFe8PlEz/giphy.gif" style="zoom:100%" div align=center alt="show"/>

## <span id="jumpto9">[9. 窗格](#9)</span>

通过窗格，你可以在同一个选项卡中并行运行多个命令行应用程序。这可以最大程度地减少在选项卡之间切换的需求，以便你一次查看多个提示符。

**使用键盘**

可以在 `Windows Teminal` 中创建新的垂直或水平窗格。 垂直拆分将在焦点窗格的右侧打开一个新窗格，而水平拆分将在焦点窗格下方打开一个新窗格。
若要创建默认配置文件的新垂直窗格，可以键入 `alt+shift++`。 若要创建默认配置文件的新水平窗格，可以键入 `alt+shift+-` 。



<img src="https://media.giphy.com/media/l5hFoMKcwhxFqJOEKk/giphy.gif" style="zoom:100%" div align=center alt="show"/>


**使用下拉菜单**

如果希望通过下拉菜单打开新窗格，可以按住 `alt` 并单击所需的配置文件。
这会 `auto` 将活动窗口或窗格拆分为所选配置文件的新窗格。 `auto` 拆分模式按具有最长边缘（可用于创建窗格）的方向进行拆分。

<img src="https://media.giphy.com/media/O2TQ2mrYO6vyjwLv0s/giphy.gif" style="zoom:100%" div align=center alt="show"/>


使用 `ctrl + shift + w ` 关闭当前窗格.


## <span id="jumpto10">[10. 安装和设置字体](#10)</span>

`Cascadia Code` 是 `Microsoft` 提供的一种新的等宽字体，可为命令行应用程序和文本编辑器提供全新的体验。 `Cascadia Code` 是与 `Windows Terminal` 一起开发的。 建议将此字体与终端应用程序和文本编辑器（如 `Visual Studio` 和 `Visual Studio Code`）一起使用。

`Windows Terminal` 在其包中提供 `Cascadia Code` 和 `Cascadia Mono` ，并默认使用 `Cascadia Mono` 。

如果字体没安装可以自行在 [Cascadia Code GitHub 发布页](https://github.com/microsoft/cascadia-code/releases) 下载 。

当前这里也可以 `Oh-my-Posh` 推荐的 [Nerd Fonts](https://github.com/JanDeDobbeleer/oh-my-posh) 制作的字体。

我这里使用的是[JetBrainsMono NF](https://github.com/ryanoasis/nerd-fonts/releases/download/v2.1.0/InconsolataGo.zip)。

*字体下载安装完成之后，需要设置才会有效。*

**PowerShell 设置字体：**

打开 `powershell` 之后，右键选择“属性” - “字体修改” 。

**Window Terminal 设置字体**

设置字体为 `JetBrainsMonoMedium NF` ,大小 `12pt` 。

在 `setting.json` 文件的 `"defaults"` 中添加：

```json
            "fontFace": "JetBrainsMonoMedium NF",
            "fontSize": 12,
```

## <span id="jumpto11">[11. Oh-My-Posh ](#11)</span>

`Oh-My-Posh` 目前已经迭代到 `Oh-My-Posh 3` ,相比于原来的 `Oh-My-Posh`(目前官方已经将原来的称之为 `Oh-My-Posh 2` ) 对 `PowerShell` 的支持更加完善,支持 `MAC` 、`Linux` 等平台，

[Oh-My-Posh 2](https://github.com/JanDeDobbeleer/oh-my-posh) 主要是为 `PowerShell` 提示符提供主题功能。另外如果需要 `Powerline` ，还需安装[Posh-Git](https://github.com/dahlbyk/posh-git) 将 `Git` 状态信息添加到提示，并为 `Git` 命令、参数、远程和分支名称添加 `tab` 自动补全。

`Oh-My-Posh 3` 本身已经支持  `Powerline`，不需要额外下载 `posh-git` 。


`Powerline` 是一个常用的命令行插件，提供自定义的命令提示符体验，提供 `Git` 状态颜色编码和提示符,用于在提示中显示附加信息。 它使用一些附加的字形来正确显示此信息。

`Powerline` 使用字形来设置提示符样式。 如果你的字体不包含 `Powerline` 字形，则在整个提示符中，你可能会看到若干 `Unicode` 替换字符 `“&#x25AF”` 。

其次，确保安装了 [Git](https://git-scm.com/downloads)。

## <span id="jumpto111">[11.1 安装 Oh-My-Posh 3 ](#111)</span>

使用 `PowerShell` ，安装 `Oh-My-Posh` ：


```bash
Install-Module oh-my-posh -Scope AllUsers
```

`CurrentUser` 指的是当前用户，为所有用户设置使用 `AllUsers` 。

*Note: 如果尚未安装 `NuGet` ，可能需要安装它。 如果是这种情况，`PowerShell` 命令行会询问是否要安装 `NuGet` 。 选择 `[Y]“是” `。 你可能还需要批准从不受信任的存储库 `PSGallery` 中安装模块。 选择 `[Y]“是”` 。*


如果使用的是 `PowerShell Core` ，请安装 `PSReadline` ：

```bash
Install-Module -Name PSReadLine -Scope AllUsers -Force -SkipPublisherCheck
```



## <span id="jumpto112">[11.2 自定义 PowerShell 提示符](#112)</span>

使用命令 `notepad $PROFILE` 或所选的文本编辑器打开 `PowerShell` 配置文件。 注意这不是的 `Windows Terminal` 配置文件。 `PowerShell` 配置文件是一个脚本，该脚本在每次启动 `PowerShell` 时运行。

`$PROFILE` 变量自动存储当前会话中可用的 `PowerShell` 配置文件的路径。

这里我们使用管理权限打开 `powershell.exe` ，利用 `$PROFILE` 变量对当前主机的所有用户配置。

当前主机，所有用户的配置路径是： `$PROFILE.AllUsersCurrentHost`.


这里需要注意下， `PowerShell` 脚本执行策略。

为了防止恶意脚本的执行， `PowerShell` 中设计 `Execution Policy`, 一种可以理解为执行策略的设计理念。
用户可以在不同的应用场景下设置不同的策略来防止恶意脚本的执行。
执行策略分为 6 种： `Restricted` 、 `AllSigned` 、 `RemoteSigned` 、`Unrestricted` 、 `Bypass` 、`Undefined`

使用 `Get-ExecutionPolicy -List` 查看以下当前工作域的权限。 如果是 `Undefined` 的话，建议改为 `RemoteSigned` 。

修改命令如下：

```bash
Set-ExecutionPolicy RemoteSigned -Scope LocalMachine
```

`CurrentUser` 指的是当前用户，为所有用户设置使用 `LocalMachine` 。

## <span id="jumpto1121">[11.2.1 检查配置文件](#1121)</span>

确定是否已在本地计算机上创建 "所有用户，当前主机" 配置文件：

```bash
Test-Path -Path $PROFILE.AllUsersCurrentHost
```

如果返回 Flase, 则先执行 [11.2.2 创建配置文件](#jumpto1121), 如果返回 True , 则直接跳到执行[11.2.3 编辑配置文件](#jumpto1123)。

或者可以直接查看变量 `$PROFILE`：

```
$PROFILE | Get-Member -Type NoteProperty
```

## <span id="jumpto1122">[11.2.2 创建配置文件](#1122)</span>

若要创建 PowerShell 配置文件，请使用以下命令格式：

```bash
if (!(Test-Path -Path <profile-name>)) {
  New-Item -ItemType File -Path <profile-name> -Force
}
```

例如，若要在 `PowerShell` 创建当前主机所有用户的配置文件，请使用以下命令：

```bash
if (!(Test-Path -Path $PROFILE.AllUsersCurrentHost)) {
  New-Item -ItemType File -Path $PROFILE.AllUsersCurrentHost -Force
}
```

执行日志参考：

```bash
PS C:\WINDOWS\system32> Test-Path -Path $PROFILE.AllUsersCurrentHost
False
PS C:\WINDOWS\system32> if (!(Test-Path -Path $PROFILE.AllUsersCurrentHost)) {
>>   New-Item -ItemType File -Path $PROFILE.AllUsersCurrentHost -Force
>> }


    目录: C:\Windows\System32\WindowsPowerShell\v1.0


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
-a----        2021/2/20     10:49              0 Microsoft.PowerShell_profile.ps1


PS C:\WINDOWS\system32>

```

## <span id="jumpto1123">[11.2.3 编辑配置文件](#1123)</span>

若要在 "记事本" 中打开 `PowerShell` 当前主机所有用户的配置文件，添加以下命令：

```bash
notepad $PROFILE.AllUsersCurrentHost
```

在 `PowerShell` 配置文件中，文件末尾添加使用 `jandedobbeleer` 主题的命令：

```
Set-PoshPrompt -Theme jandedobbeleer
```

保存关闭 `PowerShell` 配置文件之后，在 `PowerShell` 命令行中输入 `. $profile.AllUsersCurrentHost` 立即生效。


关于 `powershell` 的更多使用说明，可以参考官网的说明[介绍如何创建和使用 PowerShell 配置文件](https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7) 。


## <span id="jumpto1124">[11.2.4 自定义主题](#1124)</span>

`Oh-My-Posh` 附带了若干内置主题。前默认安装的路径是

```
C:\Program Files\WindowsPowerShell\Modules\oh-my-posh\3.96.0\themes
```

实际上，每个新实例启动时都读取 `profile` 文件 会导入 ` Oh-My-Posh`，然后 设置 `Oh-My-Posh` 主题。

我们可以使用以下命令查看当前支持的主题：

```bash
Get-PoshThemes
```

如果需要自定义主题，可以导出主题到根目录下：

```
Export-PoshTheme -FilePath ~/.mytheme.omp.json
```

自行修改之后，使用自定义的主题：
修改 `PowerShell` 的当前主机所有用户的配置文件
```
Set-PoshPrompt -Theme ~/.mytheme.omp.json
```

最后，执行 `$PROFILE` 使当前配置生效。

当然，如果只是想在当前打开的 `shell` 种有效的话， 可以不更新到 `PowerShell` 的当前主机所有用户的配置文件，直接在当前 `shell` 中执行。


也可以直接修改 `Oh-My-Posh` 自带的主题。

默认支持的主题还是比较多的。

<img src="https://gitee.com/miaogs/blog_image/raw/master/February22100672.png" style="zoom:80%" div align=center/>

下面我依次设置自带的主题，大家可以看下区别：

<img src="https://gitee.com/miaogs/blog_image/raw/master/0222121374.png" style="zoom:80%" div align=center/>



## <span id="jumpto12">[12. 右键打开](#12)</span>

`Window Terminal` 也可以实现类似鼠标右键打开 `powershell` 、 `cmd` 窗口。

新建一个文本文件比如 `OpenCmdHere.txt` ，然后复制以下内容，修改  `%USERNAME%` 为自己的用户名，图标 `terminal.ico` 可以下载我下方的图片，注意图片格式为 `.ico` 。

然后另存为 `OpenCmdHere.reg` 。 执行 `OpenCmdHere.reg` 文件即可。

```
Windows Registry Editor Version 5.00


; 若原先有，先删除原来的
;[-HKEY_CLASSES_ROOT\Directory\Background\shell\OpenCmdHere]
;[-HKEY_CLASSES_ROOT\Directory\Background\shell\runas]
;[-HKEY_CLASSES_ROOT\Directory\Background\shell\PowershellAdmin]
[-HKEY_CLASSES_ROOT\Directory\Background\shell\wt]


;Windows Terminal Preview

[HKEY_CLASSES_ROOT\Directory\Background\shell\wt]
@="Open Windows Terminal Preview here"
;"Icon"="%USERPROFILE%\\AppData\\Local\\Microsoft\\WindowsApps\\terminal.ico"
"Icon"="C:\\Users\\%USERNAME%\\AppData\\Local\\Microsoft\\WindowsApps\\terminal.ico"

[HKEY_CLASSES_ROOT\Directory\Background\shell\wt\command]
@="C:\\Users\\%USERNAME%\\AppData\\Local\\Microsoft\\WindowsApps\\wt.exe"
```

最后，修改一下 `Window terminal` 的 `setting.json` 文件， 在 `"list"` 中添加 `startingDirectory":null,`

```json
    {
        // Make changes here to the powershell.exe profile.
        "guid": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",
        "name": "Windows PowerShell",
        "commandline": "powershell.exe",
        "startingDirectory":null,
        "hidden": false
    },
```


<img src="https://gitee.com/miaogs/blog_image/raw/master/terminal.png" style="zoom:100%" div align=center/>

如果不需要高级配置，后面这一章节可以直接忽略。
大家可以看下我的最终效果。

[点击查看我的最终效果](#jumptolatest)


## <span id="jumpto13">[13. 自定义配置](#13)</span>

不管配置文件设置如何，下面列出的属性都会影响整个 `Window Terminal` 窗口。 这些应该放在 `settings.json` 文件的根目录下。（默认文本编辑器在 [Windows](ms-settings:defaultapps) 设置 中定义。）

`Windows Terminal` 支持自定义影响整个应用程序的全局属性、影响每个配置文件的设置的配置文件属性以及允许你使用键盘与 `Windows Terminal` 交互的键绑定。



### <span id="jumpto131">[13.1.1 默认的配置文件](#13.1.1)</span>

可以按 `ctrl+shift+t` 或者直接选择窗口上方 `+`（加号）按钮，也可以在命令行中输入 `wt new-tab` ，打开默认配置文件的新选项卡。 若要打开其他配置文件，请选择 `+` 按钮旁的 `˅`（箭头）打开下拉菜单。 然后可以从中选择要打开的配置文件。

配置说明：

- 属性名称 ：`defaultProfile`

- 必要性 ：必填

- 可配置的值 ：`GUID` 或配置文件名称为字符串

- 默认值 ：`PowerShell` 的 `GUID`


这个我将默认的改为 `cmd` 了。`0caa0dad-35be-5f56-a8ff-afceeeaa6101` 是 `cmd.exe` 的 `GUID` 。

```json
"defaultProfile": "{0caa0dad-35be-5f56-a8ff-afceeeaa6101}",
```

### <span id="jumpto1312">[13.1.2 开机自启动](#13.1.2)</span>

设置为 `true` 时，这将在启动时启动 `Windows Terminal` 。 将此设置为 `false` 将禁用启动任务条目。

配置说明：

- 属性名称 ：`startOnUserLogin`

- 必要性 ：可选

- 可配置的值 ：`true` , `false`

- 默认值 ：`false`

### <span id="jumpto1313">[13.1.3 加载方式](#13.1.3)</span>


这定义了 `Windows Terminal` 将以最大化，全屏或在窗口中启动。 将其设置为焦点等效于在默认模式下启动 `Windows Terminal` ，但启用了焦点模式。 同样，将其设置为 `maximumedFocus` 将导致在启用了对焦模式的最大化窗口启动 `Windows Terminal` 。

配置说明：

- 属性名称 ：`launchMode`

- 必要性 ：可选

- 可配置的值 ：`default` , `maximized` , `fullscreen` , `focus` , `maximizedFocus`

- 默认值 ：`focus`

### <span id="jumpto1314">[13.1.4 加载窗口配置](#13.1.4)</span>

**加载窗口的列**

第一次加载时在窗口中显示的字符列数。 如果将 `launchMode`设置为 ` maximized` 或 `maximizedFocus` ，则将忽略此属性。

配置说明：

- 属性名称 ：`initialCols`

- 必要性 ：可选

- 可配置的值 ：整数

- 默认值 ：120


**加载窗口的行**

第一次加载时在窗口中显示的行数。 如果将 `launchMode` 设置为 `maximized` 或 `maximizedFocus` ，则将忽略此属性。

配置说明：

- 属性名称 ：`initialRows`

- 必要性 ：可选

- 可配置的值 ：整数

- 默认值 ：30


**加载位置**

设置第一次加载时窗口左上角的像素位置。 在具有多个显示器的系统上，这些坐标相对于主显示器的左上角。 如果未提供 `X` 或 `Y` 坐标，则终端将使用系统默认值作为该值。 如果将 `launchMode` 设置为 `maximized` 或 `maximizedFocus` ，则窗口将在由这些坐标指定的监视器上最大化。

配置说明：

- 属性名称：`initialPosition`

- 必要性：可选

- 可配置的值：(支持4种格式的字符串坐标)：`","` , `"#,#"` , `"#,"` , `",#"`

- 默认值： `","`

### <span id="jumpto1315">[13.1.5 禁用动态配置文件](#13.1.5)</span>

可以设置禁用哪些动态配置文件生成器，从而防止它们在启动时将其配置文件添加到配置文件列表中。

配置说明：

- 属性名称 ：`disabledProfileSources`

- 必要性：可选

- 可配置的值 ： `"Windows.Terminal.Wsl”` , `“Windows.Terminal.Azure” ` , `“ Windows.Terminal.PowershellCore”`

- 默认值： `[]`

### <span id="jumpto1316">[13.1.6 启动动作](#13.1.6)</span>

这个目前只有 `Preview` 版本才会有。
设置要在启动时执行的操作的列表，默认情况下允许 `Window Terminal` 使用一组自定义的选项卡和窗格启动。
仅当未提供任何命令行参数时，才会应用这些操作。 动作列表由一个字符串表示，该字符串的格式与命令行参数中的命令相同。

**有关命令格式的更多信息，请访问命令行参数页面。**

配置说明：

- 属性名称 ：`startupActions`

- 必要性 ：可选

- 可配置的值 ：表示要运行的命令列表的字符串

- 默认值 ： `""`


### <span id="jumpto132">[13.2 交互](#13.2)</span>

### <span id="jumpto1321">[13.2.1 自动将选择内容复制到剪贴板](#13.2.1)</span>

如果将其设置为 `true` ，则所选内容将在创建后立即复制到剪贴板。 在这种情况下，鼠标右键单击将始终粘贴。 设置为 `false` 时，选择将保留并等待进一步的操作。 用鼠标右键单击将复制选择。

配置说明：

- 属性名称 ： `copyOnSelect`

- 必要性 ： 可选

- 可配置的值 ： `true` , `false`

- 默认值 ： `false`

这里我将默认配置改为了 `true` .

```json
    // If enabled, selections are automatically copied to your clipboard.
    "copyOnSelect": true,
```

### <span id="jumpto1322">[13.2.2 复制文本格式](#13.2.2)</span>

设置为 `true` 时，所选文本的颜色和字体格式也将复制到剪贴板。 设置为 `false` 时，仅将纯文本复制到剪贴板。 可以指定要复制的格式。

配置说明：

- 属性名称 ： `copyFormatting`

- 必要性 ： 可选

- 可接受的值 ： `true` , `false`, `all` , `none` , `html` ,`rtf`

- 默认值 ： `false`


### <span id="jumpto1323">[13.2.3 将窗口大小调整为字符网格](#13.2.3)</span>

设置为 `true`时，窗口将在调整大小时捕捉到最近的字符边界。 设置为 `false` 时，窗口将“平滑地”调整大小。

配置说明：

- 属性名称 ： `snapToGridOnResize`

- 必要性 ： 可选

- 可接受的值 ： `true`, `false`

- 默认值 ： `true`


<img src="https://media.giphy.com/media/B5BCVGu3rXeM2QjH4j/giphy.gif" style="zoom:100%" div align=center alt="show"/>


### <span id="jumpto1324">[13.2.4 Tab切换器](#13.2.4)</span>

**Tab切换器界面样式**


如果将其设置为 `true` 或 `mru` ，则 `nextTab` 和 `prevTab` 命令将使用选项卡切换器 `UI` 以及最近使用的顺序。
当设置为 `inOrder` 时，这些操作将在选项卡栏中以其当前顺序切换选项卡。
用户界面将在垂直列表中显示所有当前打开的选项卡，可使用键盘或鼠标进行导航。

最初按下`nextTab` 和 `prevTab` 的动作时，选项卡切换器将打开，并且只要按住修改键，该选项卡切换器就会保持打开状态。
释放所有修改键后，切换器将关闭，突出显示的选项卡将被聚焦。 `tab / shift + tab` ，向上和向下箭头键以及 `nextTab / prevTab` 操作可用于在切换器 `UI` 中循环。

要禁用选项卡切换器，可以将其设置为 `false` 或 `disabled` 。

配置说明：

- 属性名称 ： `tabSwitcherMode`

- 必要性 ： 可选

- 可接受的值 ：`true` , `false` , `mru` , `inOrder` , `disabled`

- 默认值 ：`inOrder`


**启用Tab切换器**

如果将其设置为 `true`，则 `nextTab` 和 `prevTab` 命令将使用选项卡切换器 `UI` 。
用户界面将在垂直列表中显示所有当前打开的选项卡，可使用键盘或鼠标进行导航。

最初按下 `nextTab` 和 `prevTab` 的动作时，选项卡切换器将打开，并且只要按住修改键，该选项卡切换器就会保持打开状态。 释放所有修改键后，切换器将关闭，突出显示的选项卡将被聚焦。 `tab / shift + tab` ，向上和向下箭头键以及 `nextTab / prevTab` 操作可用于在切换器 `UI` 中循环。

配置说明：

- 属性名称 ： `useTabSwitcher`

- 必要性 ：可选

- 可接受的值 ： `true`, `false`

- 默认值 ： `true`

<img src="https://media.giphy.com/media/FTNZrKSUiwGqnl93xi/giphy.gif" style="zoom:100%" div align=center alt="show"/>


*Note:在1.5版及更高版本中，`useTabSwitcher` 设置不再可用。 建议您改用 `tabSwitcherMode` 设置。*


### <span id="jumpto1325">[13.2.5 粘贴警告](#13.2.5)</span>

**当要粘贴的文本很大时发出警告**

设置为 `true` 时，尝试粘贴超过 `5KiB` 字符的文本将显示一个对话框，询问是否继续粘贴。
设置为 `false` 时，不显示对话框，而是立即粘贴文本。
如果在选择了很多文本之后经常不小心在终端上单击鼠标右键，这可能对防止在连接到终端的程序接收剪贴板的内容时终端变得无响应的情况很有用。

配置说明：

- 属性名称 ： `largePasteWarning`

- 必要性 ： 可选

- 可接受的值 ： `true`, `false`

- 默认值 ： `true`


**当要粘贴的文本包含多行时发出警告**

设置为 `true` 时，尝试多行粘贴文本将显示一个对话框，询问是否继续粘贴。
设置为 `false` 时，不显示对话框，而是立即粘贴文本。
在大多数外壳程序中，一行对应一个命令，因此，如果将包含 “换行符” 的文本粘贴到外壳程序中，则粘贴时可能会自动执行一个或多个命令，而没有时间来验证这些命令。
如果经常从不受信任的网站复制和粘贴命令，这将很有用。


配置说明：

- 属性名称 ： `multiLinePasteWarning`

- 必要性 ： 可选

- 可接受的值 ： `true`, `false`

- 默认值 ： `true`


### <span id="jumpto133">[13.3 外观](#13.3)</span>

### <span id="jumpto1331">[13.3.1 主题](#13.3.1)</span>


这设置了应用程序的主题。 `system` 将使用与 `Windows` 相同的主题。


配置说明：

- 属性名称 ： `theme`

- 必要性 ：可选

- 可接受的值 ： `"system"`, `"dark"` , `"light"`

- 默认值 ： `"system"`

### <span id="jumpto1332">[13.3.2 显示Tab](#13.3.2)</span>


设置为 `true` 时，总是显示选项卡。
如果将其设置为 `false` 并将 `showTabsInTitlebar` 设置为 `true` ，则选项卡将始终显示在标题栏下方。
如果将其设置为 `false` 并将 `showTabsInTitlebar` 设置为 `false` ，则只有在存在多个选项卡后，才通过键入 `ctrl + shift + t` 或键入分配给 `newTab` 的键绑定来显示选项卡。

请注意，更改此设置将需要启动新的终端实例。

配置说明：

- 属性名称 ： `alwaysShowTabs`

- 必要性 ：可选

- 可接受的值 ： `true`, `false`

- 默认值 ： `true`

### <span id="jumpto1333">[13.3.3 隐藏标题栏](#13.3.3)</span>


设置为 `true` 时，选项卡将移动到标题栏，并且标题栏消失。
设置为 `false` 时，标题栏位于选项卡上方。

请注意，更改此设置将需要启动新的终端实例。

配置说明：

- 属性名称 ： `showTabsInTitlebar`

- 必要性 ：可选

- 可接受的值 ： `true`, `false`

- 默认值 ： `true`

<img src="https://media.giphy.com/media/hW7exb5M8vdPV1y83K/giphy.gif" style="zoom:100%" div align=center alt="show"/>


### <span id="jumpto1334">[13.3.4 始终处于最佳模式](#13.3.4)</span>


设置为 `true` 时，`Windows` 终端窗口将在桌面上所有其他窗口的顶部启动。
也可以使用 `toggleAlwaysOnTop` 键绑定来切换此状态。

配置说明：

- 属性名称 ： `alwaysOnTop`

- 必要性 ：可选

- 可接受的值 ： `true`, `false`

- 默认值 ： `true`

### <span id="jumpto1335">[13.3.5 Tab 宽度模式](#13.3.5)</span>


这将设置选项卡的宽度。 `"equal"` 使每个选项卡具有相同的宽度。 `"titleLength"` 将每个选项卡的大小调整到其标题的长度。 `"compact"` 会将每个非活动标签缩小到图标的宽度，从而为活动标签留出更多空间来显示其完整标题。

配置说明：

- 属性名称 ： `tabWidthMode`

- 必要性 ：可选

- 可接受的值 ： `"equal"` , `"titleLength"` , `"compact"`

- 默认值 ： `"equal"`


<img src="https://media.giphy.com/media/VgimY4sXWFDLzU7Cqr/giphy.gif" style="zoom:100%" div align=center alt="show"/>


### <span id="jumpto1336">[13.3.6 Tab 禁用窗格动画](#13.3.6)</span>

设置为 `true` 时，这将禁用整个应用程序的视觉动画。

配置说明：

- 属性名称 ： `disableAnimations`

- 必要性 ：可选

- 可接受的值 ： `true`, `false`

- 默认值 ： `true`


### <span id="jumpto1337">[13.3.7 显示关闭所有选项卡弹出窗口](#13.3.7)</span>

如果将其设置为 `true` ，则关闭窗口并打开多个选项卡将需要确认。
设置为 `false` 时，关闭具有多个选项卡打开的窗口将不需要确认。

配置说明：

- 属性名称 ： `confirmCloseAllTabs`

- 必要性 ：可选

- 可接受的值 ： `true`, `false`

- 默认值 ： `true`



<span id="jumptolatest">
<img src="https://gitee.com/miaogs/blog_image/raw/master/0222123075.png" style="zoom:100%" div align=center alt="show"/>
</span>
