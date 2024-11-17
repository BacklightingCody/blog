/**
 * 获取当前时间并格式化为 YYYY-MM-DD HH:mm:ss 格式
 * @returns {string} 当前时间字符串
 */
export function getCurrentTime(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始
  const date = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
  return `${year}-${month}-${date}`;
}

export function formatDateFromISO(isoString: string): string {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}