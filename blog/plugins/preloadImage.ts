import { Plugin } from 'vite';
import fg from 'fast-glob';

interface preloadImagesOptions {
  dir: string | string[], // 支持单个字符串或数组
  attrs?: {
    rel?: 'preload' | 'prefetch';
  };
}

const preloadImages = (opt: preloadImagesOptions): Plugin => {
  const { dir, attrs = {} } = opt;

  return {
    name: 'vite-plugin-preload-images',
    transformIndexHtml(html, ctx) {
      const baseDir = ctx.server?.config.publicDir || 'public';
      const baseHref = ctx.server?.config.base || '/';
      // console.log('baseDir', baseDir);
      // console.log('baseHref', baseHref);
      
      // 将dir转换为数组统一处理
      const dirs = Array.isArray(dir) ? dir : [dir];
      // 收集所有文件路径
      const files = dirs.flatMap((d) =>
        fg.sync(d, { cwd: baseDir })
      );
      // console.log('files', files);

      // 生成图片路径
      const images = files.map(file => baseHref + file);
      // console.log('images', images);
      
      // 生成预加载标签
      return images.map(href => {
        return {
          tag: 'link',
          attrs: {
            rel: attrs.rel || 'prefetch',
            as: 'image',
            href,
            ...attrs,
          },
        };
      });
    },
  };
};

export default preloadImages;
