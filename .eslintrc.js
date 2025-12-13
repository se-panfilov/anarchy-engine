module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'functional', 'jest', 'sort-export-all'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:sort-export-all/recommended',
    // 'plugin:functional/external-recommended',
    'plugin:functional/recommended',
    'plugin:functional/stylistic'
  ],
  rules: {
    'functional/functional-parameters': [
      'error',
      {
        allowRestParameter: true,
        allowArgumentsKeyword: false,
        enforceParameterCount: {
          count: 'atLeastOne',
          ignoreIIFE: true
        }
      }
    ],
    'functional/no-expression-statement': 'off',
    'functional/prefer-readonly-type': 'off', //deprecated
    'functional/prefer-immutable-types': 'error',
    'functional/no-conditional-statement': 'off', // TODO (S.Panfilov) temp off (don't get this rule tbh)
    'functional/no-class': 'off', // TODO (S.Panfilov) temp off (would be great to not use classes)
    'functional/no-this-expression': 'off', // TODO (S.Panfilov) temp off (would be great to not use classes)
    'functional/no-return-void': 'off', // TODO (S.Panfilov) temp off (don't get this rule tbh)
    '@typescript-eslint/explicit-function-return-type': 'error'
  }
};
