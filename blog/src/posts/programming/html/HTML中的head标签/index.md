---
title: HTML中的 head 标签及其用途
description: 在 HTML 文档中，<head> 是一个非常重要但经常被忽视的部分。它不会直接出现在页面内容中，但却负责网页的元信息管理、SEO优化以及外部资源的引入。本篇文章将详细介绍 <head> 中的常见标签及其用途。
editLink: true
date: 2024-12-10
tag: [html]
---
[[toc]]

## 引言

在 HTML 文档中，`<head>` 是一个非常重要但经常被忽视的部分。它不会直接出现在页面内容中，但却负责网页的元信息管理、SEO优化以及外部资源的引入。本篇文章将详细介绍 `<head>` 中的常见标签及其用途。

## 基本元信息

可用于`<head>`标签的内部元素：

* `<title>`
* `<base>`
* `<link>`
* `<style>`
* `<meta>`
* `<script>`
* `<noscript>`
* `<template>`

### title：设置网页标题

用于定义网页的标题，显示在浏览器标签上。

```html
<title>backlighting's blog</title>
```

![title标题](./1.png)

### base：设置网页的根目录

HTML `<base>` 元素 指定用于一个文档中包含的所有相对 URL 的根 URL。一份中只能有一个 ` <base> `元素。一个文档的基本 URL，可以通过使用 document.baseURI 的 JS 脚本查询。如果文档不包含` <base> `元素，baseURI 默认为 document.location.href。

### meta：提供文档元信息

`<meta>` 元素定义的元数据的类型包括以下几种：

* 如果设置了 name 属性，`<meta>` 元素提供的是文档级别（document-level）的元数据，应用于整个页面。name 和 content 属性可以一起使用，以名 - 值对的方式给文档提供元数据，其中 name 作为元数据的名称，content 作为元数据的值。
* 如果设置了 http-equiv 属性，`<meta>` 元素则是编译指令，提供的信息与类似命名的 HTTP 头部相同。
* 如果设置了 charset 属性，`<meta>` 元素是一个字符集声明，告诉文档使用哪种字符编码。该属性声明了文档的字符编码。如果存在该属性，则其值必须是字符串 "utf-8" 的不区分 ASCII 大小写的匹配，因为 UTF-8 是 HTML5 文档的唯一有效编码。声明字符编码的 `<meta>` 元素必须完全位于文档的前 1024 个字节内。
* 如果设置了 itemprop 属性，`<meta>` 元素提供用户定义的元数据。

```html
//charset
<meta charset="UTF-8" />

//name,content
<meta name="viewport" content="width=device-width, initial-scale=1.0" />    //设置移动端视口
<meta name="description" content="A growing full-stack developer, you can learn about technology from his blog" /> //SEO优化
<meta name="keywords" content="blog, vue3, backlighting, personal singature">   //SEO优化
<meta name="author" content="backlighting">   //SEO优化

//http-equiv
<meta http-equiv="refresh" content="3;url=https://www.mozilla.org" />
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://trustedscripts.example.com">
```

## 外部资源

### 加载样式表

```js
<link rel="stylesheet" href="styles.css">
```

### 加载网站图标

```js
<link rel="icon" href="favicon.ico">
```

### 加载三方css相关库
<!-- 
```js
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-XXX" crossorigin="anonymous">    //bootstrap库
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"> //google字体库
``` -->

### 加载预连接（Preconnect）资源

这样做可以加快与外部资源服务器的连接速度，提升页面性能。

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
```

## style:内联样式

## script：加载脚本

## 参考文献

[MDN文档：https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/head](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/head)
