const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,
  extends: ['@antfu/eslint-config-ts'],
  rules: {
    'curly': 'off',
    '@typescript-eslint/brace-style': ['error', '1tbs'],
  },
})
