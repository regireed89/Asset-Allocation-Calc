import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'

export default defineConfig([
  globalIgnores(['dist/**', 'dist-ssr/**', 'coverage/**']),
  {
    files: ['**/*.{js,mjs,vue}'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ['*.config.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
  js.configs.recommended,
  pluginVue.configs['flat/essential'],
])
