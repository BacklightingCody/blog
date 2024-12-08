---
title: css 文字弹跳进入动画
description: 在现代网站中，动画不仅能提升用户体验，还能增加页面的互动性和吸引力。作为前端开发者，我们常用 CSS 动画来打造生动的网页效果。这篇文章将介绍如何使用 CSS 制作一个简单且效果丰富的文字弹跳进入动画，你将能够在自己的网站或项目中使用类似的动画来增强内容的呈现。
editLink: true
date: 2024-12-07
tag: [css]
---
[[toc]]

## 引言

在现代网站中，动画不仅能提升用户体验，还能增加页面的互动性和吸引力。作为前端开发者，我们常用 CSS 动画来打造生动的网页效果。这篇文章将介绍如何使用 CSS 制作一个简单且效果丰富的文字弹跳进入动画，你将能够在自己的网站或项目中使用类似的动画来增强内容的呈现。

## 文字弹跳动画

首先，我们需要定义一个包含多个文字的容器，例如一个标题,并且为其添加一个类名方便定义样式。

```html
<h1 class="title">👋 Hello World!</h1>
```

然后，我们可以使用 CSS 的 `animation` 属性结合动画`keyframes`来实现文字的弹跳效果。

```css
.title {
  display:inline-block;
  opacity: 0;
  animation: dropIn 0.6s cubic-bezier(0.42, 0, 0.77, 1.7) forwards;
}

@keyframes dropIn {
  0% {
    opacity: 0;
    transform: translateY(-200%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
```

那么其实现在的话就已经实现了整行文字的弹跳动画了，并且如果你在文字本身进行了其他transform操作，例如旋转、缩放等，也需要在`keyframes`中进行相关矫正。目前的相关效果可以在此查看：[https://codepen.io/BacklightingCody/pen/jENqZpX](https://codepen.io/BacklightingCody/pen/jENqZpX)

下一步就是进阶使用，我们可以让整行文字一个个弹跳进入，其实呢就是将整行文字拆开，并且都应用动画，通过延时展示以达到效果，这个需要借助js来实现。

```js
const titles = document.querySelectorAll('.title');
titles.forEach((title, index) => {
  const result = title.textContent.split('').map(char => `<span>${char}</span>`).join('');
  title.innerHTML = result;

  const spans = title.querySelectorAll('span');
  spans.forEach((span, index) => {
    span.style.setProperty('--delay', `${index * 0.1}s`);
  });
});
```

并且我们需要更新css中的`animation-delay`为设置的属性var(--delay),以及我们需要将整行的动画应用到里面分割的span中。

```css
.title span{
  display:inline-block;
  opacity: 0;
  animation: dropIn 0.6s var(--delay) cubic-bezier(0.42, 0, 0.77, 1.7) forwards ;
}

@keyframes dropIn {
  0% {
    opacity: 0;
    transform: translateY(-200%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
```

那么到此就实现完成了，演示地址如下：[https://codepen.io/BacklightingCody/pen/jENqZpX](https://codepen.io/BacklightingCody/pen/jENqZpX)