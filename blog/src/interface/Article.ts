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

export interface ArticleModule {
  frontmatter: {
    title: string;
    date: string;
    [key: string]: any; // 若有其他 frontmatter 字段
  };
  default: string; // 或定义为 Vue 组件类型
}