---
title: Wireshark 配合 nRF Sniffer 实现BLE抓包以及使用技巧
date: 2021-01-06 08:11:54
tags:
  - BLE
  - Nordic
categories:
  - 技术
    - Nordic 使用笔记
---


<!-- more -->



# <span id="jumpto1">[1. nRF Sniffer](#1)</span>

[nRF Sniffer forBluetooth®LE](https://infocenter.nordicsemi.com/index.jsp?topic=%2Fug_sniffer_ble%2FUG%2Fsniffer_ble%2Finstalling_sniffer_plugin.html) 是 `Nordic` 官网的调试 `BLE` 的工具。提供了在选定的低功耗蓝牙设备和与其通信的设备之间发送的蓝牙数据包的近乎实时的显示，即使链接已加密也是如此。

`nRF Sniffer forBluetooth®LE` 是由支持开发套件或者 `Dongle` 的固件和用于分析检测数据的  `Wireshark` 捕获插件两部分组成。

在开发和调试过程中，非常有助于快速识别和解决问题。

在启动时，`nRF Sniffer forBluetooth®LE`` 会列出附近所有正在宣传的蓝牙低功耗设备，并提供蓝牙地址和地址类型，完整或缩写的名称以及 `RSSI` 。

目前支持的开发套件或者 `Dongle` :
- nRF52840 DK (PCA10056)
- nRF52840 Dongle (PCA10059)
- nRF52 DK (PCA10040)
- nRF51 DK (PCA10028)
- nRF51 Dongle (PCA10031)

也可以使用其他开发板。只要 `board` 是 `PCA10056` 、`PCA10059`、`PCA10040` `PCA10028` `PCA10031` 就行，通俗的讲就是 `nrf52840` 、 `nrf52832` 、 `nrf51422` 。

`nRF Sniffer` 支持在全平台下使用。


## <span id="jumpto2">[2. 安装](#2)</span>

### <span id="jumpto21">[2.1 Step 1 安装 Wireshark ](#21)</span>

安装 `Wireshark` `v2.4.6`或者更高的版本，如果是 `window` 系统建议使用 `v3.0.7` 及其以上版本.

### <span id="jumpto22">[2.2 Step 2 安装 Python](#22)</span>

这里推荐安装 `Python3.6` 及其以上版本。

因为 `nRF Sniffer` 在 `V3.0.0` 之前都是默认基于 `Python2.7`, 但是从 `V3.0.0` 开始不再支持 `Python 2`。


### <span id="jumpto23">[2.3 Step 3 nRF Sniffer](#23)</span>

`nRF Sniffer` 这里采用官网的 [ nRF Sniffer 3.1.0 ](https://www.nordicsemi.com/Software-and-Tools/Development-Tools/nRF-Sniffer-for-Bluetooth-LE/Download#infotabs) 。

下载完成之后解压文件，假设解压之后的文件名是 *Sniffer_Software*。

#### <span id="jumpto23">[2.3.1 Step 3.1 烧写固件](#231)</span>


在 *Sniffer_Software/hex* 目录下选择相应的固件下载到开发套件或者 `Dongle`.

固件选择参考：


| Development kit/dongle     | Firmware file name                    |
|----------------------------|---------------------------------------|
| nRF52840 DK (PCA10056)     | sniffer_nrf52840dk_nrf52840_*.hex     |
| nRF52840 Dongle (PCA10059) | sniffer_nrf52840dongle_nrf52840_*.hex |
| nRF52 DK (PCA10040)        | sniffer_nrf52dk_nrf52832_*.hex        |
| nRF51 DK (PCA10028)        | sniffer_nrf51dk_nrf51422_*.hex        |
| nRF51 DK (PCA10031)        | sniffer_nrf51dongle_nrf51422_*.hex    |

烧写固件的方法有三种，但是都是需要 `J-Link`,确保安装了[SEGGER J-Link software](https://www.segger.com/downloads/jlink/#J-LinkSoftwareAndDocumentationPack)。

- 使用[nRF Connect for Desktop ](https://www.nordicsemi.com/Software-and-Tools/Development-Tools/nRF-Connect-for-desktop)的 `nRF Connect Programmer`
- 安装 [nRF Command Line Tools](https://www.nordicsemi.com/Software-and-tools/Development-Tools/nRF-Command-Line-Tools/Download) 之后，使用 [nrfjprog](https://infocenter.nordicsemi.com/index.jsp?topic=%2Fug_nrf_cltools%2FUG%2Fcltools%2Fnrf_nrfjprogexe_reference.html&anchor=nrf_nrfjprogexe_reference) 命令。
- 使用 [SEGGER J-Link software](https://www.segger.com/downloads/jlink/#J-LinkSoftwareAndDocumentationPack) 中的 `J-Flash`

三种方法都可行，这里我使用的是第二种。

```bash
    nrfjprog -f nrf52 --eraseall
    nrfjprog -f NRF52 --program %HEX_NAME% --chiperase --verify
    nrfjprog -f nrf52 --reset
```


#### <span id="jumpto24">[2.3.2 Step 3.2 Wireshark 安装 nRF Sniffer capture tool](#232)</span>

1. 在 *Sniffer_Software/extcap* 目录下执行命令 `pip install -r requirements.txt` 或者 `pip3 install -r requirements.txt` 安装 `Python`依赖 `pyerial` 。
2. 复制 *Sniffer_Software/extcap* 中的全部内容到 `Wireshark` 的外部捕捉插件的文件目录。
    - `Help` > `About Wireshark` ( `Windows/Linux` ) 或者 `Wireshark` > `About Wireshark` ( `macOS` ).
    <img src="https://gitee.com/miaogs/blog_image/raw/master/January06172630.png" style="zoom :100%" div align=center />
    - 选择 `Folders` 选项，然后双击 `Extcap path`
    <img src="https://gitee.com/miaogs/blog_image/raw/master/January06172932.png" style="zoom :100%" div align=center />
    - 复制
    <img src="https://gitee.com/miaogs/blog_image/raw/master/January06173133.png" style="zoom :100%" div align=center />
3. 确保刚刚复制的 `nRF Sniffer` 内容可以正常运行。
    - 在刚才的`Wireshark` 的外部捕捉插件的文件目录下执行 `nrf_sniffer_ble.bat --extcap-interfaces`(window) 或者 `nrf_sniffer_ble.sh --extcap-interfaces`(Linux/Macos).正常的执行结果参考如下;
    <img src="https://gitee.com/miaogs/blog_image/raw/master/January06173534.png" style="zoom :100%" div align=center />
    - 如果有问题，参考一下分析
      - 查看 `Python --version` 是否返回正常，是否是需要改为 `python3 --version`
      - 在 `Linux` 或者 `Macos` 下是不是因为权限问题导致运行异常。
4. 最后，在 `Wireshark` 中打开 ` nRF Sniffer capture tool`
    - 刷新 `wreshark` 的 `interfaces`。选择 `Capture` > `Refresh Interfaces` 或者直接 `F5` 。
    - 选择 `View` > `Interface Toolbars` > `nRF Sniffer for Bluetooth LE`
    <img src="https://gitee.com/miaogs/blog_image/raw/master/January06174535.png" style="zoom :100%" div align=center />


#### <span id="jumpto25">[2.3.3 Step 3.3 Wireshark 添加 nRF Sniffer 配置文件](#233)</span>


在 `Wireshark` 中添加一个配置文件，以方便的方式显示 `nRF Sniffer forBluetooth®LE` 记录的数据。

打开 `Wireshark` 之后：

- `Help` > `About Wireshark` ( `Windows/Linux` ) 或者 `Wireshark` > `About Wireshark` ( `macOS` ).
- 选择 `Folders` 选项,然后双击打开 `Personal configuration`
    <img src="https://gitee.com/miaogs/blog_image/raw/master/January06175136.png" style="zoom :100%" div align=center />
- 复制 *Sniffer_Software/Profile_nRF_Sniffer_Bluetooth_LE* 到 `Wireshark` 的个人配置路径下作为一个新增的 `prefile`
    <img src="https://gitee.com/miaogs/blog_image/raw/master/January06175437.png" style="zoom :100%" div align=center />
- 打开 `Wireshark` , 选择 `Edit` > `Configuration Profiles`, 选择 `Profile_nRF_Sniffer_Bluetooth_LE` 确认。
    <img src="https://gitee.com/miaogs/blog_image/raw/master/January06175438.png" style="zoom :100%" div align=center />


## <span id="jumpto2">[2. 抓包](#2)</span>

开发套件或者 `Dongle` 上电之后，接上 J-Link ,连接到电脑，最后打开 `Wireshark`

1. 选择一下 `interface`
    <img src="https://gitee.com/miaogs/blog_image/raw/master/January06180541.png" style="zoom :100%" div align=center />
2. 选择 `device address`
    <img src="https://gitee.com/miaogs/blog_image/raw/master/January06180139.png" style="zoom :100%" div align=center />
3. 查看报文
这里我用了另外一个 `BLE` 设备一直在发 `becaon` 包，内容是 `02150112233445566778899aabbccddeeff001020304C3`
    <img src="https://gitee.com/miaogs/blog_image/raw/master/January06180240.png" style="zoom :100%" div align=center />
