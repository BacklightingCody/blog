import http from '@/utils/http'

// 获取文章评论列表
export const getComments = (articleId: string, sortBy: 'hot' | 'time' = 'time') => {
  return http.request({
    url: `articles/${articleId}/comments`,
    method: 'get',
    params: { sortBy },
  })
}

// 提交评论
export const addComment = (articleId: string, userId: string, content: { text: string; images: string[] }) => {
  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('text', content.text);

  // 将图片文件添加到 FormData 中
  content.images.forEach(image => {
    // 假设 image 是文件对象
    formData.append('images', image);
  });

  return http.request({
    url: `/articles/${articleId}/comments`,
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',  // 告诉后端这是一个文件上传请求
    }
  });
}

// 提交回复
export const addReply = (commentId: number, userId: string, content: { text: string; images: string[] }) => {
  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('text', content.text);

  // 将图片文件添加到 FormData 中
  content.images.forEach(image => {
    formData.append('images', image);
  });

  return http.request({
    url: `/articles/comments/${commentId}/replies`,
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
}

// 点赞评论或回复
export const likeComment = (id: number, isReply: boolean, userId: string) => {
  return http.request({
    url: isReply ? `/articles/replies/${id}/like` : `/articles/comments/${id}/like`,
    method: 'post',
    data: { userId },
  })
}
