---
title: 多个SSH-Key管理
date: 2020-12-14 07:49:40
tags:
 - SSH
categories:
 - 技术
 - SSH
---


当存在多个 git 账号时，比如:

- GitLab ：公司内部使用，`user.email` 是公司的邮箱，`user.name` 是公司内部制定的
- GitHub : 个人平时使用，`user.email` 是个人的邮箱, `user.name` 是个人定义的

这里我们如何更好地管理呢？本文以 Linux 环境为例，其他环境类似。

<!-- more -->

## [1. Git 配置多个 SSH-Key](#1)

如何生成 `SSH` 秘钥这里大家可以参考 [2.2 如何生成 Ed25519 秘钥以及如何添加](#jump22) .这里我们就默认已经生成了 `SSH` 秘钥。

这里 `GitLab` 的秘钥被我命名为 `id_ed25519` ,而 `GitHub` 这里的秘钥被我命名为 `id_ed25519_github`,


在 `~/.ssh` 目录下新建一个`config`文件，没有后缀名。 添加如下内容：

```bash
# Read more about SSH config files: https://linux.die.net/man/5/ssh_config
#GitHub
Host github.com
 HostName github.com
 User git
 IdentityFile ~/.ssh/id_ed25519_github

#GitLab
Host gitlab.com
 HostName gitlab.com
 User git
 IdentityFile ~/.ssh/id_ed25519_gitlab
```

参数说明：

- `Host` ：连接的主机的名称，可自定,比如这里填写 `git` 服务器的域名
- `Hostname` ：远程主机的 `IP` 地址,比如这里填写 `git` 服务器的域名
- `User` ：用于登录远程主机的用户名
- `Port` ：用于登录远程主机的端口
- `IdentityFile` ：本地的 `id_rsa` 的路径



这里以 `GitHub` 为例，在 `Github` 上添加新的 SSH 秘钥之后(可以参考[2.2 如何生成 Ed25519 秘钥以及如何添加](#jump22)) 。


验证一下：

```bash
gmiao@linuxserverwifi:~/.ssh$ ssh -T git@github.com
Hi miaogs! You've successfully authenticated, but GitHub does not provide shell access.
```


如果这里我们在生成秘钥的使用全部使用默认配置，比如 `ed25519` 秘钥的名称默认就是 `id_ed25519` ，是不会生成 `config` 文件的。


<!-- https://www.chrisjhart.com/Windows-10-ssh-copy-id/ -->


## <span id="jumpto2">[2.FAQ](#2)</span>

### [2.1 查看当前主机中存在的 SSH 秘钥](#2.1)

`ls -al ~/.ssh`


### <span id="jumpto22">[2.2 如何生成 Ed25519 秘钥以及添加](#2.2)</span>

如何生成 `Ed25519` 秘钥 可以直接参考 [GitHub Docs](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

更多的关于如何使用 `SSH` 连接参考 [Connecting to GitHub with SSH](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/connecting-to-github-with-ssh)

