---
title: 蓝牙(BLE)协议分析- BLE地址类型
date: 2020-12-25 08:10:54
tags:
  - BLE
  - Nordic
categories:
  - 技术
    - BLE
      - BLE协议分析
---

`BLE` 和 `WiFi` 的 `MAC` 地址还是不同的，这里简单总结一下。

<!-- more -->

也可以在`Bluetooth Core specification v4.2, Vol 6, Part B, 1.3 DEVICE ADDRESS` 或者 `Bluetooth Core specification v5.0, Vol 6, Part B, 1.3 DEVICE ADDRESS`


<img src="https://gitee.com/miaogs/blog_image/raw/master/BLE ADDR Types.png" style="zoom:100%" div align=center />

## <span id="jumpto1">[1. Public Device Address](#1)</span>

在经典蓝牙中(`Bluetooth Core specification v4.0` 之前),
这个公共设备地址与  `WiFi` 模组中的 `MAC` 地址一样，都是需要向 `IEEE` 申请并且购买， 当然了 `WIFi` 的这个 `MAC` 地址是用在 `TCP/IP` 网络中的，蓝牙的这个 公共设备地址是在蓝牙中的。
但是他们都有一些一样的属性,就是唯一性。

再者，其设备地址是一个 `48bits` 的数字，称作 `48-bit universal LAN MAC address` 。

蓝牙协议栈也遵循了这种地址分配方式。由 `24-bit` 的 `company_id` 和 `24-bit` 的 `company_assigned` 组成。

<img src="https://gitee.com/miaogs/blog_image/raw/master/December2517565.png" style="zoom:100%" div align=center />


## <span id="jumpto2">[2. Random Device Address](#2) </span>

但是到了蓝牙低功耗 `BLE` 时代, 在 [Public Device Address](#jumpto1) 基础之上增加了随机设备地址 `Random Device Address` 。

大致的原因如下：

1. 向 `IEEE` 申请和管理比较繁琐，而且购买地址是需要花钱的
2. 本身蓝牙协议规范中很大一部分应用场景是广播，所以会因为暴露设备地址而暴露更多的信息。

基于此，从 `Bluetooth Core specification v4.0` 开始，蓝牙协议栈增加了一种协议，支持随机设备地址，这种设备地址不是固定分配的，而是有设备启动后随机生成的。

在此基础之上，又可以将设备地址分为静态设备地址和私密设备地址。


### <span id="jumpto21">[2.1 Static Device Address](#21) </span>

`Static Device Address` 是设备在上电时随机生成的地址。 比如现在 `Nordic` 默认都是使用这个静态地址的。
相比较 [Public Device Address](#jumpto1) 而言，很好的解决了申请和维护管理 `Public Device Address` 所带来的问题。


<img src="https://gitee.com/miaogs/blog_image/raw/master/December2810136.png" style="zoom:100%" div align=center />


需要注意的地方是：

1. 最高的两个 `bit` 位不可修改且为 `11`
2. 其余剩余的 `46bits`


### <span id="jumpto22">[2.2 Private Device Address](#22) </span>

`Private Device Address` 私密设备地址使用随机生成的方式。可以定时更新和地址加密。这样也就提高了蓝牙地址的可靠性和安全性。

根据地址是否加密，可以将 `Private Device Address` 分为 [Non-resolvable Private Address](#jumpto221) 和 [Resolvable Pricvate Address](#jumpto222) 。


#### <span id="jumpto221">[2.2.1 Non-resolvate Private Address](#221) </span>

`Non-resolvable private address` 不可解析私密地址和 [Static Device Address](#jumpto21) 类似，不同之处在于，`Non-resolvable private address` 会定时更新。更新的周期称是由 `GAP` 规定的，称作 `T_GAP` ，建议值是15分钟。



不可解析私密地址的特征如下：

- 最高的两个 `bit` 位都为1
- 剩余的 46 bits 是一个随机数，至少一位是0且至少一位是1
- 以 `T_GAP` 为周期，定时更新

但是，我觉得这类地址应该不常用或者在特殊场景下使用，因为地址老是变来变去不是坑队友吗？

<img src="https://gitee.com/miaogs/blog_image/raw/master/December2811147.png" style="zoom:100%" div align=center />

#### <span id="jumpto222">[2.2.2 Resolvate Private Address](#222) </span>


要生成一个可解析私有地址[Resolvate Private Address](#jumpto222)(简称 `RPA`)，设备必须具备以下两种条件之一:
 `Local Identity Resolving Key` 本地身份解析密钥或 `Peer Identity Resolving Key` 对等身份解析密钥,这两个都简称 `IRK` 。


可解析私有地址由 `IRK` 和一个随机生成24位数生成的。随机数被称为 `prand` ，并应是满足以下要求。
- `Prand` 的两个最高的位应该是 “10”
- `prand` 的随机部分中至少有一个位是 “0”
- `prand` 的随机部分中至少有一个位是 “1”

可解析私有地址的特征总结如下：
1. 由两部分组成：
    - 高位 `24bits` 是随机数部分，其中最高两个 `bit` 为“10”，用于标识地址类型
    - 低位 `24bits` 是随机数和 `IRK` 经过 `hash` 运算得到的 `hash` 值，运算的公式为 $hash = ah(IRK, prand)$
2. 当对端 `BLE` 设备扫描到该类型的蓝牙地址后，会使用保存在本机的 `IRK` 和该地址中的 `prand`进行同样的 `hash` 运算，并将运算结果和地址中的 `hash` 字段比较，相同的时候才进行后续的操作。这个过程称作 `resolve` （解析）。
3. 以 `T_GAP` 为周期定时更新。即使在广播、扫描、已连接等过程中也可能改变地址。
4. `RPA` 不能单独使用,如果使用，需要要同时具备 `Public Device Address` 或者 `Static Device Address` 中的一种。
5. `RPA` 并不能保护广播包的数据。如果有敏感信息，建议放到 `scan response packet`中。

<img src="https://gitee.com/miaogs/blog_image/raw/master/December2814558.png" style="zoom:100%" div align=center />

