module.exports = {
  'env': {
    'browser': false,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'prettier',
  ],
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    }
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
  },
  globals: {
    fetch: 'readonly',
    console: 'readonly',
    process: 'readonly',
  }
};
