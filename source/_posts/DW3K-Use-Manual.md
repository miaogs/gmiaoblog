---
title: DW3K-Use-Manual
date: 2021-02-02 06:20:37
tags:
---

## <span id="jumpto1"> [1. DW3000简介/Overview of the DW3000](#1) </span>

## <span id="jumpto2"> [2. DW3000接口/Interfacing to the DW3000](#2) </span>

## <span id="jumpto2"> [3. 消息发送/Message transmission](#3) </span>

## <span id="jumpto4"> [4. 消息接收/ Message reception](#4) </span>


#### 4.1.2 <span id="jumpto412"> [4.1.2 前导累积/Preamble accumulation](#412) </span>

一旦检测到前导序列，接收端开始累积相关的前导符号并且开始建立信道冲激相应( `CIR` : `Channel Impulse response`),
同时并行寻找 `SFD` 序列(前导符号的特定序列，有关详细信息可以参考 [2.9 ](jumpto29) 同步报头调节方案)。









## <span id="jumpto12"> APPENDIX 2: Abbreviations and acronyms

| Abbreviation | Full  Title              | Explanation                                                                   |
|--------------|--------------------------|-------------------------------------------------------------------------------|
| CIR          | channle impulse response | 通过 DW3000 检测到的在发射端和接收端之间的通信信道的脉冲响应。 实际上这是信道脉冲响应的估计，但是缩写 `CIR` 在本手册中也用于表示以上意思。 |

