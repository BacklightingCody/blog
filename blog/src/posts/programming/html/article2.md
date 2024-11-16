# 三种blog实现文稿模块的方法

启动 VitePress 开发服务器：

你需要运行 vitepress dev 来启动 VitePress。这将允许你加载和渲染 Markdown 文件，并在 Vue 组件中直接使用它们。
将 VitePress 与 Vue 项目分开：

如果你希望 VitePress 只处理博客部分，你可以将其与 Vue 项目分开运行。Vue 用来处理其他页面，VitePress 用来处理博客部分。这可以通过两个不同的开发服务器来实现，一个是 Vue 的开发服务器（例如运行 pnpm dev），另一个是 VitePress 的开发服务器（运行 vitepress dev）。
静态文件部署：

如果你不想启动开发服务器，而是希望将 VitePress 的静态文件构建出来，你可以使用 vitepress build 来生成静态页面。这些文件可以部署到服务器上，之后通过 Vue 项目的 iframe 或者其他方式来嵌入这些静态页面。
