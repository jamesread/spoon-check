import js from '@eslint/js'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser
      }
    },
    rules: {
      semi: ['error', 'never'],
      'comma-dangle': ['error', 'never'],
      'space-before-function-paren': ['error', 'always']
    }
  },
  {
    files: ['sw.js'],
    languageOptions: {
      globals: {
        ...globals.serviceworker
      }
    }
  }
]
