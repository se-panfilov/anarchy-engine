module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'functional', 'sort-export-all', 'simple-import-sort', 'import'],
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:functional/recommended',
    'plugin:functional/stylistic'
  ],
  rules: {
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
    'import/no-named-as-default': 'off',
    'functional/functional-parameters': [
      'error',
      {
        allowRestParameter: true,
        allowArgumentsKeyword: false,
        enforceParameterCount: false
      }
    ],
    'functional/no-expression-statement': 'off',
    'functional/prefer-readonly-type': 'off', //deprecated
    'functional/prefer-immutable-types': 'off', //broken in the latest eslint
    // 'functional/prefer-immutable-types': [
    //   'error',
    //   {
    //     enforcement: 'None',
    //     parameters: {
    //       enforcement: 'ReadonlyShallow'
    //     }
    //   }
    // ],
    'functional/no-expression-statements': 'off',
    'functional/no-throw-statements': 'off',
    'functional/no-throw-statement': 'off',
    'functional/no-conditional-statements': 'off',
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
    '@typescript-eslint/no-explicit-any': 'off', // TODO (S.Panfilov) better to turn it on probably, but not right now
    '@typescript-eslint/no-inferrable-types': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error'
  },
  overrides: [
    {
      files: ['src/Engine/**/*'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: '@/Engine',
                message: "Please import a certain module instead of a whole folder, e.g. '@/Engine/Foo' instead of '@/Engine'"
              },
              {
                name: '@Engine',
                message: "Please import a certain module instead of a whole folder, e.g. '@Engine/Foo' instead of '@Engine'"
              }
            ]
          }
        ]
      }
    },
    {
      files: ['src/App/**/*'],
      rules: {
        'no-restricted-imports': ['off']
      }
    }
  ]
};
