export const ImportsRules = {
  'import/no-unresolved': 'off',
  'import/order': 'off',
  'import/export': 'error',
  'import/no-absolute-path': 'error',
  'import/no-dynamic-require': 'error',
  'import/no-webpack-loader-syntax': 'error',
  'import/no-commonjs': 'error',
  'import/no-amd': 'error',
  'import/no-nodejs-modules': 'off',
  'import/first': 'error',
  'import/newline-after-import': 'error',
  'import/no-duplicates': 'error',
  'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
  'import/no-mutable-exports': 'error',
  'import/no-cycle': [2, { maxDepth: 1 }],
  'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
  'import/no-named-as-default': 'off'
};
