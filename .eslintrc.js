module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_uid', '__dangerouslyDisableSanitizersByTagID', '_jsonld'] }],
    'no-param-reassign': ['error', { props: false }],
    'no-unused-vars': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
        vue: 'always',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
    'import/core-modules': ['vue', 'vue-meta'],
  },
  overrides: [
    {
      files: ['test/**/**.spec.*'],
      env: {
        jest: true,
      },
      plugins: ['jest'],
    },
  ],
};
