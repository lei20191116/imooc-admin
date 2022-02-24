module.exports = {
  // 当前eslint文件为根目录
  root: true,
  // evn 启用eslint 检查环境
  env: {
    // node环境下 启动eslint检查
    node: true
  },
  // eslint 中基础配置需要继承的配置
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  // 解析器
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  // 需要修改的启用规则及其各自的错误级别
  /**
   * 错误级别分为三种
   * “off” 或 0 - 关闭规则
   * “warn” 或 1 - 开启规则，使用警告级别的错误：warn（不会导致程序退出）
   * “error” 或 2 - 开启规则，使用错误级别的错误： error（当被触发的时候，程序退出）
   */
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 'off'
  }
}
