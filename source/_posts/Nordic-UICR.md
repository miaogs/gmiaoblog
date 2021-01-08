---
title: Nordic UICR使用笔记
date: 2021-01-07 03:43:08

tags:
  - BLE
  - Nordic
categories:
  - 技术
    - Nordic 使用笔记

---

`Nordic` 芯片默认是不使用 `Pbulic Device Address` 的。如果需要自行烧录 `Static Device Address` ，可以使用 `UICR` ，包括序列号 SN 等等信息都可以存储在 `UICR` 。
<!-- more -->


# 1. UICR
[`UICR](https://infocenter.nordicsemi.com/index.jsp) 的全称是 `User information configuration regusters` 。中文名是用户信息配置寄存器，是非易失性存储器寄存器，用于配置用户特性的设置。属于 `NVMC` (`non-volatile memory controller`) 的一部分。

操作 `NVMC` 时需要注意停止 `CPU` 工作。`NVMC`正在写入时,如果 `CPU` 正在运行,那么 `CPU` 会被停止。
这块区域是 `Nordic` 芯片内部 `Flash` 内存。`UICR`使用的时候还需要注意写入和擦除不能同时进行即可。

[nRF52840 UICR](https://infocenter.nordicsemi.com/index.jsp)


## 2. UICR 烧写方式

### 2.1. coding

需要特备注意的是启用 `SoftDevice` 时，`UICR` 受到保护，在使能 `Softdevice` 之前写入/擦除所需的 `UICR` ，并在之后使能 `Softdevice` 。[Nordic DevZone ](https://devzone.nordicsemi.com/f/nordic-q-a/42106/access-to-uicr) 也有说明。
- 关闭 `SoftDeivce ` ： `sd_softdevice_disable(void)`
- 使能 `softDevice` : `sd_softdevice_enable(nrf_clock_lf_cfg_t const * p_clock_lf_cfg, nrf_fault_handler_t fault_handler)`

``` C
    #define UICR_ADDRESS                    0x10001088  /** CUSTOMER[0] : 0x10001088 */
    const uint32_t UICR_ADDR_0x80 __attribute__((at(0x10001088))) __attribute__((used)) = 0xABCD1234;
    ...
    /*read*/
    uint16_t major_value = ((*(uint32_t *)UICR_ADDRESS) & 0xFFFF0000) >> 16;
    uint16_t minor_value = ((*(uint32_t *)UICR_ADDRESS) & 0x0000FFFF);
```

### 2.2. 直接使用 `nrfjporg` 命令

可以使用 `Nordic` 官方的 [ nRF Command Line Tools](https://www.nordicsemi.com/Software-and-Tools/Development-Tools/nRF-Command-Line-Tools)  工具中的 `nrfjprog` 命令直接使用烧录 `UICR` 。

此方法 `Window` 、 `Linux` 、 `Mac` 都支持。

**强力推荐这个方法。**


#### 2.2.1 Step 1： 下载安装 nRF Command Line Tools

`Nordic` 官方的 [ nRF Command Line Tools](https://www.nordicsemi.com/Software-and-Tools/Development-Tools/nRF-Command-Line-Tools) 工具.

安装版本不低于 `V10.7.0` 。

执行 `nrfjporg --version` 查看是否安装成功

``` bash
gmiao@linux:~$ nrfjprog --version
nrfjprog version: 10.7.0
JLinkARM.dll version: 6.62b
gmiao@linux:~$
```

#### 2.2.2 Step 2: 擦除

##### 2.2.2.1 Step 2.1 : 全部擦除

擦除固件本身以及 `UICR` ，也就是可以擦除的全部都擦除了。
- 对于 `nRF51` 设备，只有在带有预编程的 `SoftDevice` 情况下才可进行该操作

执行命令

``` bash
nrfjprog --snr <Segger-chip-Serial-Number> -f nrf52 --earseall
```

执行结果参考：

``` bash
gmiao@linux:~$ nrfjprog   --snr 683702081 -f nrf52 --earseall
Erasing user available code and UICR flash areas.
Applying system reset.
gmiao@linux:~$
```

##### 2.2.2.2 Step 2.2 : 只擦除 `UICR

不擦除固件本身，仅仅擦除 `UICR`。

- 对于 `nRF51` 设备，只有在带有预编程的 `SoftDevice` 情况下才可进行该操作
- 对于 `nRF91` 设备，该操作不可用。要删除 `UICR` ，请使用 `--eraseall`
- 对于 `nRF52` 设备, 没有以上限制。

执行命令

``` bash
nrfjprog --snr <Segger-chip-Serial-Number> -f nrf52 --eraseall
```

执行结果参考：

``` bash
gmiao@linux:~$ nrfjprog   --snr 683702081 -f nrf52 --eraseall
Erasing UICR flash area.
Applying system reset.
gmiao@linux:~$
```

擦除之后如果使用[2.2.4 Step 4: 读取验证](#jumpto224)，应该是全 `FF`

执行结果参考：

``` bash
gmiao@linux:~$ nrfjprog   --snr 683702081 -f nrf52 --memrd 0x10001088 --n 4
0x10001088: FFFFFFFF                              |....|
gmiao@linux:~$
```


#### 2.2.3 Step 3: 烧写UICR

假设在 `CUSTOMER[2] : 0x10001088` 写入值 `0xABCD1234` 。

具体使用哪个寄存器自行确认。

`nRF52840` 的 `UIRC` 开放给客户使用的寄存器参考如下：

`Jlink` 使用 `SWD` 接口.

<img src="https://gitee.com/miaogs/blog_image/raw/master/Ec8oo4rBmMSCm40.png" style="zoom :100%" div align=center />

执行命令

``` bash
nrfjprog   --snr <Segger-chip-Serial-Number> -f nrf52 --memwr <addr> --val <val>
```

执行结果参考：

``` bash
gmiao@linux:~$ nrfjprog   --snr 683702081 -f nrf52 --memwr 0x10001088 --val 0xABCD1234
Parsing parameters.
Writing.
gmiao@linux:~$
```

#### <span id="jumpto224">[2.2.4 Step 4: 读取验证](#2.2.4)</span>

执行命令：

``` bash
nrfjprog --snr <Segger-chip-Serial-Number> -f nrf52 -- memrd <addr> --n <n>
```


执行结果参考：

``` bash
gmiao@linux:~$ nrfjprog   --snr 683702081 -f nrf52 --memrd 0x10001088 --n 4
0x10001088: ABCD1234                              |<...|
gmiao@linux:~$
```

如果当前 `PC` 只连接了一个 `J-Link` 可以省略 `snr` 参数。



### 2.2.4. 生成 .hex 文件烧录

1. 使用 HEX编辑器比如 [FlexHEX](http://www.flexhex.com/),将所需的数据写到编辑器，但是需要注意字节顺序，因为从芯片读取时，字节顺序会颠倒。保存文件之后导出二进制文件,假设是 `uicr.bin` 。
2. 使用 Srecord]() 之类的工具将二进制文件转换为十六进制文件，假设写到 `CUSTOMER[0]`(此寄存器的偏移量是 `0x080` ),  数据是 `1234` ，

    ```bash

    srec_cat uicr.bin -binary -offset=4224 -o uicr.hex -intel -obs=16
    ```
3. 使用 `Nordic` 官方的 [nRF Command Line Tools](https://www.nordicsemi.com/Software-and-Tools/Development-Tools/nRF-Command-Line-Tools)  工具中的 `mergehex` 命令合并固件

    假设，应用固件是 `app.hex`

    ```bash
    mergehex -m app.hex uicr.hex -o output.hex
    ```

4. 使用 `Nordic` 官方的 [nRF Command Line Tools](https://www.nordicsemi.com/Software-and-Tools/Development-Tools/nRF-Command-Line-Tools)  工具中的 `nrfjprog` 命令合并固件

    ``` bash
    nrfjprog --family nRF52 --eraseall
    nrfjprog --program output.hex -f NRF52
    ```

这里有一个地方需要说明的是，不推荐大家使用。
- 需要为每个设备生成单独的十六进制文件
- 如果 `UICR` 某些字段可能已经被应用程序使用(比如 `DFU` 引导加载程序)，烧录十六进制文件的第一步是擦除所有受到影响的字段，所以有可能现有的 `UICR` 中的内容可能会因此被擦除。

所以，如果真的需要使用这个方法的话，建议使用的最后的地址。如 `nrf52840` 就使用客户允许使用的 `UCIR` 最大地址：`CUSTOMER[31]:0x1000010FC`

这部分官方也有说明[Best method for writing to UICR during production](https://devzone.nordicsemi.com/f/nordic-q-a/62878/best-method-for-writing-to-uicr-during-production).


## 3. nrfjporg 命令

在烧录固件的时候，也可以擦除选择。

在烧录之前，擦除全部包括 `UICR` ，没有被编程过的区域也会被擦除。使用 `--chiperase` 参数

``` bash
nrfjprog -f nrf52 --program<hex_file> --chiperase --verify
```


在烧录之前，除了 `UICR` 其他的擦除。使用 `--sectorerase` 参数

``` bash
nrfjprog -f nrf52 --program <hex_file> --sectorerase --verify
```


在烧录之前，被编程过的区域包括 `UICR`，才会被擦除，没有被编程的区域不会擦除。使用 `--sectoranduicrerase ` 参数

``` bash
nrfjprog -f nrf52 --program <hex_file> --sectoranduicrerase  --verify
```



<!-- you should be able to read register values using the register address from restricted peripherals when the SoftDevice is enabled. but  Its write and erase using the NVMC that is blocked.[SoftDevice and accessing NRF_FICR data](https://devzone.nordicsemi.com/f/nordic-q-a/36582/softdevice-and-accessing-nrf_ficr-data)  -->