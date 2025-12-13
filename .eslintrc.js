module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'functional', 'sort-export-all'],
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
    'import/no-unresolved': 'off',
    'functional/functional-parameters': [
      'error',
      {
        allowRestParameter: true,
        allowArgumentsKeyword: false,
        enforceParameterCount: false
        // enforceParameterCount: {
        //   count: 'atLeastOne',
        //   ignoreIIFE: true
        // }
      }
    ],
    'functional/no-expression-statement': 'off',
    'functional/prefer-readonly-type': 'off', //deprecated
    'functional/prefer-immutable-types': [
      'error',
      {
        enforcement: 'None',
        parameters: {
          enforcement: 'ReadonlyShallow'
        }
      }
    ],
    'functional/no-expression-statements': 'off',
    'functional/no-throw-statements': 'off',
    'functional/no-throw-statement': 'off',
    'functional/no-mixed-types': 'off',
    'functional/no-let': 'off',
    'functional/no-mixed-type': 'off',
    'functional/no-conditional-statement': 'off', // TODO (S.Panfilov) temp off (don't get this rule tbh)
    'functional/no-class': 'off',
    'functional/no-classes': 'off',
    'functional/readonly-type': ['error', 'generic'],
    'functional/no-this-expression': 'off',
    'functional/no-return-void': 'off', // TODO (S.Panfilov) temp off (don't get this rule tbh)
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-explicit-any': 'error'
  }
};
