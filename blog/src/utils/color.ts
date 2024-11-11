// 生成随机颜色的函数
export const generateRandomColor = () => {
  // 生成一个鲜艳的颜色
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  let alpha = 0.2
  // 确保颜色足够饱和
  const max = Math.max(r, g, b)
  const scale = 255 / max

  const newR = Math.min(255, Math.floor(r * scale))
  const newG = Math.min(255, Math.floor(g * scale))
  const newB = Math.min(255, Math.floor(b * scale))
  const rgba = `rgba(${newR}, ${newG}, ${newB},${alpha})`
  const rgb = `rgb(${newR}, ${newG}, ${newB})`
  return { rgba, rgb }
}

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

// 动态更新CSS变量
export const updateCSSVariables = (theme) => {
  const { rgba, rgb } = generateRandomColor()
  const root = document.documentElement
  if (theme.value === 'dark') {
    // root.style.setProperty('--background-color', '#2c303f')
    // root.style.setProperty('--btn-color', '#08cd7c')
    // root.style.setProperty('--btn-text-color', '#aae7ff')
    // root.style.setProperty('--text-color', '#E2E2E5')
    // root.style.setProperty('--icon-color', '#03a2fe')
    // root.style.setProperty('--accent-color', '#705ad6')
    // root.style.setProperty('--active-color', '#ff785a')
    root.style.setProperty('--currency-color', rgba)
    root.style.setProperty('--currgb-color', rgb)
  } else {
    // root.style.setProperty('--background-color', '#f5f5f7')
    // root.style.setProperty('--btn-color', '#007BFF')
    // root.style.setProperty('--btn-text-color', '#005575')
    // root.style.setProperty('--text-color', '#2c2c2e')
    // root.style.setProperty('--icon-color', '#FF8C00')
    // root.style.setProperty('--accent-color', '#8a72d9')
    // root.style.setProperty('--active-color', '#ff7b42')
    root.style.setProperty('--currency-color', rgba)
    root.style.setProperty('--currgb-color', rgb)
  }
}
