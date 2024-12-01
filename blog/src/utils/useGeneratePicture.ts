import { pictureLibrary } from "./pictureLibrary";

/**
 * 从配置文件中随机获取一张图片路径
 * @returns {string} 随机图片的路径
 */
export function getRandomPicture() {
  const categories = Object.keys(pictureLibrary); // 获取所有分类
  if (!categories.length) {
    return "";
  }

  // 随机选取分类
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const images = pictureLibrary[randomCategory];

  if (!images || !images.length) {
    // console.error(`分类 ${randomCategory} 下无图片`);
    return "";
  }

  // 随机选取图片
  return images[Math.floor(Math.random() * images.length)];
}
