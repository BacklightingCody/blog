export interface Article {
  id: string
  title: string
  date: string
}
export interface ArticleList {
  category: string
  subcategory: string
  articles: Article[]
  total: number
}
