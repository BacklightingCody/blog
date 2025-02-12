// utils/copyUtils.ts
export const copyWithCopyright = (
  text: string,
  articleUrl: string
): Promise<void> => {
  const cleanUrl = articleUrl.substring(0, articleUrl.lastIndexOf('/') + 1);
  const copyrightInfo = `
  作者：backlighting
  链接：${cleanUrl}
  来源：backlighting's blog
  著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
  `;

  const textToCopy = text + `\n\n${copyrightInfo}`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(textToCopy)
      .then(() => {
        console.log('已使用 Clipboard API 复制文本并添加版权信息:', textToCopy);
      })
      .catch((err) => {
        console.error('Clipboard API 复制失败:', err);
        return fallbackCopy(textToCopy);
      });
  } else {
    return fallbackCopy(textToCopy);
  }
};



function fallbackCopy(text: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const tempInput = document.createElement('input');
    tempInput.style.position = 'fixed';
    tempInput.style.opacity = '0'; // 隐藏输入框
    tempInput.value = text;
    document.body.appendChild(tempInput);

    tempInput.select();
    tempInput.setSelectionRange(0, 99999); /* For mobile devices */

    try {
      document.execCommand('copy'); // 仍然使用 execCommand，但仅作为最后的回退
      console.log('已使用输入框方法复制文本:', text);
      resolve();
    } catch (err) {
      console.error('输入框方法复制失败:', err);
      alert('复制失败，请手动复制。'); // 或其他错误处理
      reject(err);
    } finally {
      document.body.removeChild(tempInput);
    }
  });

}




