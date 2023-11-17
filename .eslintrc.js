module.exports = {
    root: true,
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    env: {
      es6: true,
      jest: true,
      browser: true,
      amd: true,
      node: true
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended'
    ],
    rules: {
      'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false, argsIgnorePattern: '^_'}],
      'react/prop-types': 'off'
    }
  }
