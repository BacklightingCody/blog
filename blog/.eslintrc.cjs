/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  plugins: ['vue', '@typescript-eslint'],
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'vue/multi-word-component-names': 'off',
    "vue/comment-directive": ["off", {
      "reportUnusedDisableDirectives": false
    }]
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'eslint-config-prettier', // eslint 使用 prettier 配置
    // 'plugin:prettier/recommended', // eslint prettier 兼容插件
    '@vue/eslint-config-prettier/skip-formatting'
  ]
}
