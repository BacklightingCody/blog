import http from '@/utils/http'

// 获取文章评论列表
export const getComments = (articleId: number, sortBy: 'hot' | 'time' = 'time') => {
  return http.request({
    url: `/articles/${articleId}/comments`,
    method: 'get',
    params: { sortBy },
  })
}

// 提交评论
export const addComment = (articleId: number, content: { text: string; images: string[] }) => {
  return http.request({
    url: `/articles/${articleId}/comments`,
    method: 'post',
    data: content,
  })
}

// 提交回复
export const addReply = (commentId: number, content: { text: string; images: string[] }) => {
  return http.request({
    url: `/comments/${commentId}/replies`,
    method: 'post',
    data: content,
  })
}

// 点赞评论或回复
export const likeComment = (id: number, isReply: boolean) => {
  return http.request({
    url: isReply ? `/replies/${id}/like` : `/comments/${id}/like`,
    method: 'post',
  })
}
