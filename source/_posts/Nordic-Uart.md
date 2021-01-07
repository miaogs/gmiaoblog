---
title: Nordic(nrf52840) UART/UARTE 使用笔记
date: 2021-01-04 03:32:06
tags:
  - BLE
  - Nordic
categories:
  - 技术
    - Nordic 使用笔记
---

<!-- more -->


## [1. UART](#1)

uART/UARTE 都需要使用外部晶振，以获取稳定的时钟精度，从而确保通信稳定。

<span id="jumpimageto11">
<img src="https://gitee.com/miaogs/blog_image/raw/master/January04114017.png" style="zoom :100%" div align=center />
</span>

<center style="font-size:14px;color:#C0C0C0;text-decoration:underline">UART原理框图(摘自Nordic官网) </center>


### <span id ="jumpto11">[1.1 功能描述](#1.1) </span>

`UART` 特性如下：

1. 全双工
2. 自动流控
3. 支持奇偶校验并自动产生校验位
4. 1 位停止位

在 [UART原理框图](#jumpimageto11) 中， `UART` 总共有四个引脚配置寄存器，可以通过信号映射将其映射到任意一个 `GPIO` 。
- `UART` 的发送通过 `STARTTX` 和 `STOPTX` 来开始和停止
    - **发送是没有硬件缓存的**
    - 发送之后，会产生一个 `TXDRDY` 事件
- `UART` 的接收通过 `STARTRX` 和 `STOPRX` 来开始和结束
    - 接收成功之后，**数据由硬件 `FIFO` 提取到 `RXD` 寄存器**并会产生一个 `RXDRDY` 事件


### <span id="jumpto12">[1.2 引脚配置](#1.2)</span>

`nrf52840` 的 `UART` 支持硬件流控 `TXD` 和 `RXD` 分别用于接收和发送数据， `RTS` 和 `CTS` 用于硬件流控。

在[1.1 功能描述](#jumpto11)中提到，这四个信号可以通过 `PSELRXD` 、 `PSELTXD` 、 `PSELRTX`  、 `PSELCTS` 四个寄存器映射到任何一个 `GPIO` 。

需要注意的是:
- `nrf52840` 只有一个 `UART`
- 同一个时刻信号只能映射到一个引脚

默认的引脚配置

| Register | UART pin | Direction | Output value   |
|----------|----------|-----------|----------------|
| PSELRXD  | RXD      | Input     | Not applicable |
| PSELCTS  | CTS      | Input     | Not applicable |
| PSELRTS  | RXD      | Output    | 1              |
| PSELTXD  | TXD      | Output    | 1              |

### <span id="jumpto13">[1.3 发送流程](#1.3)</span>

<img src="https://gitee.com/miaogs/blog_image/raw/master/January04131818.png" style="zoom :100%" div align=center />

通过触发 `STARTTX` 任务( 向任务寄存器 `STRATTX` 写入 1 )来启动 `UART` 发送序列。数据写入到 `TXD` 寄存器发送，每次发送一个字节，每次发送结束之后，会产生一个 `TXDRDY`  事件，这时可以继续向 `TXD` 寄存器写入下一个要发送的数据。

通过触发 `STOPTX` 任务(向任务寄存器 `STOPTX` 写入1 )来停止 `UART` 发送，触发后，`UART` 发送会立即停止。

如果使能了硬件流控， `TXD` 中写入数据之后， 如果 `CTS` 信号有效 ( `CTS` 为低电平，允许发送)， `TXD` 中的数据会被传送到 `Lifeline` ,否则，发送会被挂起直到 `CTS` 信号有效。


### <span id="jumpto14">[1.4 接收流程](#1.4) </span>

<img src="https://gitee.com/miaogs/blog_image/raw/master/January04172022.png" style="zoom :100%" div align=center />

通过触发 `STARTRX` 任务( 向任务寄存器 `STRATRX` 写入 1 )来启动 `UART` 接收序列。 `UART` 接收有6个字节的硬件 `FIFO` , 最多可以缓存6个字节的数据。

`UART` 接收的数据通过 `RXD` 寄存器读出， 当从 `RXD` 寄存器中读取一个字节数据后， `FIFO` 中待提取的数据会移动一个字节数据到 `RXD` 寄存器，并产生一个 `RXDRDY` 事件。

如果使能了硬件流控， `UART` 会在 `FIFO` 剩余 4 个字节时失效 `RTS` 信号， 此时 `UART` 的 `FIFO` 存在 4个空闲字节空间，也就是说此时还能接收4个字节数据并且不会被覆盖，之后的数据会被覆盖掉。

`RTS` 信号在 `FIFO` 为空时有效，即当 `CPU` 读出所有的接收数据后， `RTS` 信号有效。 如果触发 `STOPRX` 任务( 向任务寄存器 `STOPRX` 中写入 1 )停止接收序列， `RTS`  信号失效， 但是这个时候 `UART` 可以继续接收 4 或者 5 字节数据。因为 `STOPRX` 任务触发之后， `UART` 能够根据波特率的配置继续接收一段时间内数据，在这段时间结束后， `UART` 产生超时事件( `RXTO` 事件)。

为了防止数据丢失，在每个 `RXDRDY` 事件产生后， `RXD` 数据只能读取一次。
为了保证 `CPU` 可以通过 `RXDRDY` 寄存器检测到所有的 `RXDRDY` 事件， `RXDRDY` 事件寄存器必须在读取 `RXD` 寄存器之前清除，这么做的原因是一旦 `RXD` 寄存器被写入一个新的数据，这个时候 `FIFO` 可能为空，因此在读取 `RXD` 后会立即产生新的事件。


### <span id="jumpto15">[1.5 UART 挂起](#1.5)</span>

通过触发 `SUSPEND` 任务可以暂停 `UART` 。
`SUSPEND` 将同时影响 `UART` 接收器和 `UART` 发射器，即发射器将停止传输，接收器将停止接收。 `UART` 的发送和接收在暂停之后可以恢复，但要在通过分别触发 `STARTTX` 和 `STARTRX` 。

在执行 `SUSPEND` 任务后，将在挂起 `UART` 之前完成正在进行的 `TXD` 字节传输。

触发 `SUSPEND` 任务时， `UART` 接收器的行为与触发 `STOPRX` 任务时的行为相同。

## [2. UARTE](#2)

`UARTE` 和 `UART` 共享内存和资源，区别在于 `UARTE` 是通过 `EsayDMA` 进行数据收发。
`UARTE` 适合大批量数据传输。


<span id="jumpimageto11>
<img src="https://gitee.com/miaogs/blog_image/raw/master/January04174824.png" style="zoom :100%" div align=center />
</span>

<center style="font-size:14px;color:#C0C0C0;text-decoration:underline">UARTE原理框图(摘自Nordic官网) </center>


### <span id ="jumpto21">[2.1 功能描述](#1.1) </span>

`UARTE` 特性如下：

1. 全双工
2. 自动流控
3. 支持偶校验并自动产生校验位
4. 1/2 位停止位
5. `EasyDMA`
6. 串口波特率最高支持 `1Mbps`
7. 支持传输间隔自动进入 `IDLE` (使用硬件流控时)
8. `LSB` 数据格式



### <span id="jumpto13">[2.3 发送流程](#2.3)</span>

<img src="https://gitee.com/miaogs/blog_image/raw/master/January04180125.png" style="zoom :100%" div align=center />


`UARTE` 发送时，需要先将待发送的数据写入到发送缓存（发送缓存必须位于片内 `RAM` ）然后将缓存的地址写入 `TXD.PTR` 寄存器，并将发送的数据的字节数写入到 `TXD.MAXCNT` 寄存器，之后触发 `STARTTX` 任务（即向任务寄存器 `STARTTX` 中写入1)启动发送序列.

发送启动后，发送缓存中的数据通过 `DMA` 传送到 `TXD` 寄存器中发送，每发送一个字节数据（即一个字节数据由 `TXD` 寄存器传送到物理线路）产生一次 `IXDRDY` 事件，当发送数据字节数达到 `TXD.MAXNT` 寄存器中定义的字节数时， `UARTE` 自动停止发送并产生 `ENDX` 事件。
如果要停止 `UARTE` 发送，触发 `STOPTX` 任务（即向任务寄存器 `STOPTX` 中写入1)即可，触发后， `UARTE` 停止发送并产生 `IXSTOPPED` 事件。





### <span id="jumpto14">[2.4 接收流程](#2.4)</span>


<!-- <img src="https://gitee.com/miaogs/blog_image/raw/master/January04174823.png" style="zoom :100%" div align=center /> -->

通过触发 `STARTRX` 任务（即向任务寄存器 `STARTRX` 中写入1)启动接收， `UARTE` 接收时，数据由物理线路进入硬件 `FIFO` ，之后由 `EASYDMA` 将数据写入到应用程序在 `RAM` 中定义的接收缓存。

接收缓存是应用程序在 `RAM` 开辟的一段存储空间， `EASYDMA` 和接收缓存之间是通过 `RXD.PTR` 寄存器和 `RXD.MAXCNT` 寄存器联系起来的，换句话说就是 `EASYDMA` 通过 `RXD.PTR` 寄存器知道向 `RAM` 中写入数据的起始地址，通过 `RXD.MAXCNT` 寄存器知道应该写入多少个字节。

`RX` 缓冲区位于 `RXD.PTR` 寄存器中指定的地址。`RXD.PTR` 寄存器是双缓冲，并且可以在 `RXSTARTED` 事件产生之后立即更新并为下一个 `STARTRX` 任务做准备。
`RX` 缓冲区的大小在 `RXD.MAXCNT` 寄存器中指定，当 `UARTE` 填满 `RX` 缓冲区时，它将产生 `ENDRX` 事件。

对于通过 `RXD` 线接收到的每个字节，将生成一个 `RXDRDY` 事件。 在将相应的数据传输到数据 `RAM` 之前，很可能发生此事件。
可以在 `ENDRX` 事件之后查询 `RXD.AMOUNT` 寄存器，以查看自上一个 `ENDRX` 事件以来有多少新字节已传输到 `RAM` 中的 `RX` 缓冲区。
