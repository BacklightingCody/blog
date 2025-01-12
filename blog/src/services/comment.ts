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
  return http.request({
    url: `/articles/${articleId}/comments`,
    method: 'post',
    data: { content, userId },
  })
}

// 提交回复
export const addReply = (commentId: number, userId: string, content: { text: string; images: string[] }) => {
  return http.request({
    url: `/articles/comments/${commentId}/replies`,
    method: 'post',
    data: { content, userId },
  })
}

// 点赞评论或回复
export const likeComment = (id: number, isReply: boolean, userId: string) => {
  return http.request({
    url: isReply ? `/articles/replies/${id}/like` : `/articles/comments/${id}/like`,
    method: 'post',
    data: { userId },
  })
}
