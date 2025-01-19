---
title: JavaScript中的Worker
author: ''
description: >-
  在本文中，我们将深入探讨JavaScript中的Worker，揭示它如何提升网页性能，特别是通过后台处理任务来保持用户界面的响应性。我们将从基本概念开始，逐步讲解如何使用Worker，以及其在现代Web开发中的实际应用。
editLink: true
date: 2023-01-19T00:00:00.000Z
tag:
  - js
id: 9c7ad4bd73b266c0bfd6fc60f1d6132b
---
[[toc]]

## 引言

在现代Web开发中，性能和用户体验是关键。随着JavaScript应用变得越来越复杂，确保UI的流畅性变得至关重要。这就是JavaScript中的Worker进入舞台的地方。Worker允许开发者将繁重的计算或耗时的任务移到后台执行，从而避免阻塞主线程。本文将带你了解Worker的基本原理、如何使用它们，以及为什么它们在提升Web应用性能方面如此重要。

## Worker的基本概念

### 什么是Worker?

Web Workers 使得一个 Web 应用程序可以在与主执行线程分离的后台线程中运行一个脚本操作。这样做的好处是可以在一个单独的线程中执行费时的处理任务，从而允许主（通常是 UI）线程运行而不被阻塞。

它的作用就是给 JS 创造多线程运行环境，允许主线程创建 worker 线程，分配任务给后者，主线程运行的同时 worker 线程也在运行，相互不干扰，在 worker 线程运行结束后把结果返回给主线程。这样做的好处是主线程可以把计算密集型或高延迟的任务交给 worker 线程执行，这样主线程就会变得轻松，不会被阻塞或拖慢。这并不意味着 JS 语言本身支持了多线程能力，而是浏览器作为宿主环境提供了 JS 一个多线程运行的环境。

### Web &nbsp;Workers的种类

Web Workers 分为三种主要类型，每种都有其特定的用途和特点：

1. Dedicated Workers（专用 Worker）
Dedicated Workers 是为单个页面或脚本服务的专用后台线程。它们适合执行那些可能阻塞用户界面的复杂计算或数据处理任务，如加密解密、图像处理等，提供了一个不影响主线程的处理方式。通过将这些任务移到 Dedicated Workers 中，你可以确保网页的用户界面保持流畅，不会因为计算而变得卡顿或无响应。Dedicated Workers 与创建它们的页面之间有直接的通信渠道，允许数据在两者之间无缝传递，因此它们非常适合需要即时反馈的任务，比如实时数据分析或用户交互中基于计算的结果进行动态更新。
2. Shared Workers（共享 Worker）
Shared Workers 允许多个页面或脚本共享同一个 Worker 实例。Shared Workers 让多页面共享一个后台线程成为可能，这意味着如果你的应用程序有多个窗口或标签页需要处理同样的任务或维持一致的状态，Shared Worker 可以作为一个中央处理点。它们非常适合实时通信应用，如聊天室或多玩家游戏，其中多个客户端可能需要访问相同的实时数据或状态。Shared Workers 通过端口通信，使得它们能够处理来自多个来源的请求，而不需要每创建一个新页面就启动一个新的 Worker 实例，这在资源管理上更高效。
3. Service Workers（服务 Worker）
Service Workers 则是为离线功能、网络请求管理、推送通知和后台数据同步而设计的。它们运行在独立于页面的线程中，能在用户没有打开网页时进行工作，极大地增强了应用的性能、可用性和用户体验，但需在安全环境（如HTTPS）下运行。

Service Workers 提供了超越传统Web应用能力的功能，使得开发者能够构建更具交互性和响应性的体验。它们不仅能缓存资源以支持离线使用，提供更快的加载速度和减少网络使用，还能通过拦截网络请求来优化性能，比如提供离线页面或从缓存中直接返回数据。Service Workers 还支持推送通知，这意味着即便用户没有打开你的应用，你仍然可以提醒他们有新的消息或更新。此外，Service Workers 能在网络断开后重连时自动同步数据，确保用户数据的一致性和完整性。这类 Worker 的生命周期管理更为复杂，但它们带来的离线能力和性能优化对于现代 Web 应用来说是不可或缺的，尤其是在渐进式 Web 应用（PWA）中。

### Worker的生命周期

* 创建（Creation）:
启动一个 Worker 就像雇佣一个新员工一样。你告诉浏览器：“嘿，我需要一个新线程来帮忙。”通过调用 new Worker()，你提供一个脚本路径，相当于给员工一份工作说明书。Dedicated 和 Shared Workers 会马上开始工作，Service Workers 则需要先注册，就像实习生需要先报到一样。

* 启动（Initialization）:
一旦 Worker 被创建，它会开始读它的工作说明书（脚本）。这是它准备好接手任务的阶段，就像员工在熟悉环境和设备。

* 通信（Communication）:
Worker 和主线程就像是两部对讲机，彼此可以通过 postMessage() 发送信息。主线程可以说：“处理这个数据。” Worker 就去做，然后把结果“回传”给主线程。这让它们可以协同工作，却不互相打扰。

* 运行（Execution）:
这是 Worker 真正干活的时候。它们可能在计算、处理数据或者处理网络请求。就像员工在完成自己的任务，确保网页的其他部分不受影响。

* 错误处理（Error Handling）:
如果 Worker 出现了问题，它会通过 onerror 事件告诉主线程，就像员工碰到问题会向上级报告一样。这样，开发者就能知道哪里出了错并加以修复。

* 终止（Termination）:
对于 Dedicated Workers，主线程可以说：“你可以下班了。”通过 Worker.terminate()，Worker 会立即停止工作。对于 Shared Workers，只有所有使用它的部分都关闭时，它才会结束工作。Service Workers 则像清洁工，可能会继续工作直到浏览器决定收拾卫生。

* 卸载（Unloading）:
当你关闭网页或者应用，所有 Worker 都会被“解雇”，除非是 Service Workers，它们可能还会继续提供离线功能，直到浏览器认为它们可以退休了。了解这些阶段帮助我们更好地管理资源，让网页运行得更顺畅。

## 使用 Worker

1. 创建一个新的 worker 很简单。你需要做的是调用 Worker() 构造器，指定一个脚本的 URI 来执行 worker 线程

```js
const myWorker = new Worker("worker.js");
```

2. Worker和主线程之间的通信只需要两个API，即用于接收消息的onmessage或addEventListener以及用于发送消息的postMessage，可以无缝地实现基于消息的交互。

```js
/* main.js */
const worker = new Worker("./worker.js");

// 从主线程发送消息
worker.postMessage({ data: '从主线程发送的数据' });

// 主线程接收消息
worker.onmessage = (e) => {
    const { data } = e;
    if (!data) return;
    console.log(data);
}
```

```js
/* worker.js */
// Worker线程接收消息
self.addEventListener('message', (e) => {
    const { data } = e;
    if (!data) return;
    // Worker线程发送消息
    self.postMessage({data: 'Worker收到了数据'})
});
```

3. 主线程可以监听 Worker 是否发生错误。如果发生错误，Worker 会触发主线程的` error` 事件。

```js
worker.onerror(function (event) {
  console.log([
    'ERROR: Line ', e.lineno, ' in ', e.filename, ': ', e.message
  ].join(''));
});

// 或者
worker.addEventListener('error', function (event) {
  // ...
});
```

4. 有两种方法可以终止Worker。可以在内部终止，也可以从主线程发出终止指令。

```js
/* main.js */
worker.terminate();

/* worker.js */
self.close();
```

## 使用Worker的注意点

（1）同源限制

Web Workers 受到严格的同源策略限制，这意味着 Worker 脚本必须与主页面在同一域名下运行。换句话说，你不能直接从其他域加载 Worker 脚本，除非目标服务器通过 CORS（跨源资源共享）策略允许这种访问。实施 CORS 需要服务器端的配置，如设置适当的 HTTP 头部（如 Access-Control-Allow-Origin），以允许跨域 Worker 脚本的加载。

（2）DOM 限制

Worker 的运行环境与主线程是隔离的，意味着它无法直接访问或修改主页面中的 DOM 对象。Worker 无法使用 document、window、parent 等与页面交互的全局对象。然而，Worker 仍然可以访问如 navigator 和 location 这样的一些全局对象，这为获取浏览器信息或位置数据提供了一些便利。

（3）通信联系

Worker 线程和主线程间是通过消息传递进行通信的，它们不能直接访问彼此的执行环境。这种异步通信机制意味着处理数据传输可能存在延迟。此外，数据传输受到结构化克隆算法的限制，只能传递可以序列化的数据类型。函数、DOM 节点以及某些内置对象（如 Error 对象）不能直接传递。需要注意的是，传递数据时，JavaScript 会创建数据的深度副本，这可能在处理大数据时影响性能。

（4）脚本限制

在 Worker 中，不能使用 alert() 或 confirm() 这样的弹窗函数，因为这些操作需要与用户界面交互，而 Worker 线程是没有直接访问用户界面的权限的。不过，Worker 可以使用 XMLHttpRequest 或 fetch API 发送 AJAX 请求，这样可以与服务器通信，但响应处理仍然需要通过消息传递返回给主线程。

（5）文件限制

Worker 不能直接访问本地文件系统，因此无法读取 file:// 协议下的文件。Worker 脚本必须来自网络，这意味着开发者在本地开发时需要通过一个本地服务器来测试 Worker。

（6）错误处理

由于 Worker 运行在独立的执行环境中，任何异常或错误都不会自动传播到主线程。必须通过 onerror 事件在 Worker 内捕获错误，并通过消息系统将错误信息传递给主线程。同样，主线程也需要设置 onerror 事件监听器来处理从 Worker 传来的错误信息，确保错误不会被忽略。

（7）资源

Worker 线程拥有自己的内存空间，这提供了并发处理的优势，但也带来了资源管理的挑战。长时间运行的 Worker 或大数据处理可能导致内存泄漏，因此需要仔细管理 Worker 的生命周期。同时，Worker 会消耗 CPU 资源，如果创建了过多的 Worker，可能会对系统性能产生负面影响。开发者需要在 Worker 的数量和系统资源利用之间找到平衡。

## Worker的性能优势

### 保持UI响应

通过将计算密集型任务移到 Worker 中，UI 线程不会被阻塞，保持用户界面响应性。例如，在处理大型数据集或生成报告时，用户仍然可以与页面交互。

## 参考文章

[https://juejin.cn/post/7277917854431035407](https://juejin.cn/post/7277917854431035407)
[https://www.illacloud.com/zh/blog/web-worker-tutorial/#%E4%BB%80%E4%B9%88%E6%98%AFweb-worker](https://www.illacloud.com/zh/blog/web-worker-tutorial/#%E4%BB%80%E4%B9%88%E6%98%AFweb-worker)
[https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers#%E4%B8%93%E7%94%A8_worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers#%E4%B8%93%E7%94%A8_worker)
[https://www.ruanyifeng.com/blog/2018/07/web-worker.html](https://www.ruanyifeng.com/blog/2018/07/web-worker.html)
[https://www.freecodecamp.org/chinese/news/general-introduction-to-web-worker/](https://www.freecodecamp.org/chinese/news/general-introduction-to-web-worker/)
