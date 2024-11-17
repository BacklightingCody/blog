// 生成随机颜色的函数
export const generateRandomColor = () => {
  // 随机生成 RGB 值，限制范围避免太深的颜色
  const min = 100; // 最低值，防止颜色太暗
  const max = 255; // 最高值

  let r, g, b;
  do {
    r = Math.floor(Math.random() * (max - min) + min);
    g = Math.floor(Math.random() * (max - min) + min);
    b = Math.floor(Math.random() * (max - min) + min);
  } while (Math.abs(r - g) < 30 && Math.abs(g - b) < 30 && Math.abs(r - b) < 30);
  // 避免 R、G、B 差异过小导致颜色偏灰

  const alpha = 0.7; // 透明度
  const rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`;
  const rgb = `rgb(${r}, ${g}, ${b})`;

  return { rgba, rgb };
};

// 生成一组随机颜色
export const generateRandomColors = (count) => {
  const colors = []
  for (let i = 0; i < count; i++) {
    colors.push(generateRandomColor())
  }
  return colors
}

// 调整颜色亮度
export const adjustColorBrightness = (color, amount) => {
  let usePound = false

  if (color[0] === '#') {
    color = color.slice(1)
    usePound = true
  }
  let num = parseInt(color, 16)
  let r = (num >> 16) + amount
  let g = ((num >> 8) & 0x00ff) + amount
  let b = (num & 0x0000ff) + amount

  return (
    (usePound ? '#' : '') +
    (
      0x1000000 +
      (r < 255 ? (r < 0 ? 0 : r) : 255) * 0x10000 +
      (g < 255 ? (g < 0 ? 0 : g) : 255) * 0x100 +
      (b < 255 ? (b < 0 ? 0 : b) : 255)
    )
      .toString(16)
      .slice(1)
  )
}

export const modifyCurColor = (color?: string, theme?: string) => {
  const root = document.documentElement;
  const { rgba, rgb } = generateRandomColor();
  if (color) {
    // 如果传入了 color，则根据其透明度设置对应的 CSS 变量
    root.style.setProperty('--currency-color', color);
  } else if (theme) {
    // 如果没有传入 color，而传入了 theme，则根据 theme 随机生成颜色
    if (theme === 'dark') {
      root.style.setProperty('--currency-color', rgba);
      root.style.setProperty('--currgb-color', rgb);
    } else {
      root.style.setProperty('--currency-color', rgba);
      root.style.setProperty('--currgb-color', rgb);
    }
  } else {
    console.error('Either a color or theme must be provided.');
  }
  return { rgba, rgb }
};
export function parseRGBA(rgbaString) {
  const regex = /rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*(\d*\.?\d+)?\)/;
  const match = rgbaString.match(regex);

  if (match) {
    return {
      r: parseInt(match[1], 10),
      g: parseInt(match[2], 10),
      b: parseInt(match[3], 10),
      a: match[4] !== undefined ? parseFloat(match[4]) : 0.7, // 默认不透明
    };
  }

  throw new Error('Invalid RGBA string');
}