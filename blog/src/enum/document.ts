export enum DocCategory {
  Programming = '编程',
  Technology = '技术',
  Experience = '经历',
  Recipe = '菜谱',
  Motto = '一言'
}

export enum DocCategoryRoute {
  Programming = 'programming',
  Technology = 'technology',
  Experience = 'experience',
  Recipe = 'recipe',
  Motto = 'motto'
}

export const docCategoryMap = Object.entries(DocCategory).map(([key, value]) => ({
  name: value, // 中文名
  route: DocCategoryRoute[key as keyof typeof DocCategoryRoute], // 对应路由
}));

export enum TechTree {
  HTML = 'HTML',
  CSS = 'CSS',
  JS = 'JS',
  TS = 'TS',
  Vue = 'Vue',
  Node = 'Node',
  Algorithm = '算法',
  Network = '网络',
  Database = '数据库',
}
