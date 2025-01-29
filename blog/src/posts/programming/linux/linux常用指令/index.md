---
title: linux基本指令
description: >-
  本文档旨在为初学者和有经验的用户提供一个全面的Linux基本指令指南。从文件操作到系统管理，我们将探索各种命令及其用法，帮助用户有效地在Linux环境中导航和操作。
editLink: true
date: 2024-01-29T00:00:00.000Z
tag:
  - linux
id: 53adc9fefb498d8dfac5897567c643f7
---
[[toc]]

## 引言

命令行界面（CLI）作为Linux的核心，提供了高效的操作方式，能够通过简单的指令完成复杂的任务。掌握Linux基本指令不仅是系统管理的基础，也是提升工作效率的关键。本文将从基础文件操作到系统管理，逐步介绍常用指令及其应用场景，帮助用户快速上手并深入理解Linux的强大功能。

## 基本文件操作指令

* ls - 列出目录内容
  就是 list 的缩写，通过 ls 命令不仅可以查看 linux 文件夹包含的文件，而且可以查看文件权限(包括目录、文件夹、文件权限)、查看目录信息等等。常用的选项包括-l（显示详细信息）、-a（显示所有文件，包括隐藏文件）和-h（人类可读的文件大小）。
* cd - 切换目录
* pwd - 显示当前工作目录路径
* mkdir - 创建新文件夹
* rmdir - 从一个目录中删除一个或多个子目录项，删除某目录时也必须具有对其父目录的写权限
* cp - 将源文件复制至目标文件，或将多个源文件复制至目标目录
  >注意：命令行复制，如果目标文件已经存在会提示是否覆盖，而在 shell 脚本中，如果不加 -i 参数，则不会提示，而是直接覆盖！
  >* -i 提示
  >* -r 复制目录及目录内所有项目
  >* -a 复制的文件与原文件时间一样
* mv - 移动或重命名文件或目录
* rm - 删除一个目录中的一个或多个文件或目录，如果没有使用 -r 选项，则 rm 不会删除目录。如果使用 rm 来删除文件，通常仍可以将该文件恢复原状。

>详细见 [https://www.runoob.com/w3cnote/linux-common-command-2.html](https://www.runoob.com/w3cnote/linux-common-command-2.html)

## 文件查看与编辑

* cat - 三大功能:一次显示整个文件,从键盘创建一个文件(只能创建新文件，不能编辑已有文件),将几个文件合并为一个文件。
* more 和 less - 分页查看文件
* head 和 tail - 查看文件的开头或结尾(默认10行)
* nano 和 vim - 文本编辑器

## 文件权限与所有权

* chmod - 更改文件权限
* chown - 更改文件所有者
* chgrp - 更改文件所属组

>详情见上一篇文章：[linux目录结构与常用命令](https://www.backlighting.cn/docs/programming/linux/linux%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84%E4%B8%8E%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86#%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5)

## 系统信息与管理

* uname - 显示系统信息
* top 和 htop - 实时显示系统进程和资源使用情况
* ps - 显示当前进程状态
* kill - 终止进程
* shutdown 和 reboot - 关闭或重启系统

## 网络相关指令

* ping - 用于测试网络连接是否正常
* ifconfig 和 ip - 用于配置和显示网络接口的信息
* netstat - 显示网络连接、路由表等信息
* ssh - 远程登录

## 包管理

* apt - Debian系包管理
  * apt update：更新包列表。
  * apt install 包名：安装软件包
  * apt remove 包名：卸载软件包
* yum 和 dnf - Red Hat系包管理
  * yum install 包名：安装软件包
  * yum remove 包名：卸载软件包
* pacman - Arch Linux包管理
  * pacman -S 包名：安装软件包
  * pacman -R 包名：卸载软件包

## 脚本与自动化

* echo - 将指定的文本或变量的值输出到标准输出
* cron - 设置定时任务

## 高级技巧与工具

* grep - 在文件中搜索指定文本
* awk 和 sed - 文本处理工具
* find - 在目录中搜索文件
* tar - 打包或解包文件

```bash
grep "keyword" file.txt  # 在file.txt中搜索keyword

awk '{print $1}' file.txt  # 打印file.txt的第一列
sed 's/old/new/g' file.txt # 将file.txt中的old替换为new

find /home -name "*.txt"  # 在/home目录中搜索所有.txt文件

tar -czvf archive.tar.gz folder  # 打包并压缩folder目录
tar -xzvf archive.tar.gz         # 解压archive.tar.gz

```

## 参考文献

[https://www.runoob.com/w3cnote/linux-common-command-2.html](https://www.runoob.com/w3cnote/linux-common-command-2.html)
