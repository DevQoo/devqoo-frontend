module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {
    // 기본 규칙
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-unused-vars': 'warn',

    // 코드 스타일
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'indent': ['error', 2],

    // Vue 규칙
    'vue/multi-word-component-names': 'off'
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  }
}
