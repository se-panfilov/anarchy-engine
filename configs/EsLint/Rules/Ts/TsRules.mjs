export const TsRules = {
  '@typescript-eslint/explicit-function-return-type': 'error',
  '@typescript-eslint/no-explicit-any': 'off', // TODO better to turn it on probably, but not right now
  '@typescript-eslint/no-inferrable-types': 'off',
  '@typescript-eslint/no-misused-spread': 'error',
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_'
    }
  ],
  '@typescript-eslint/restrict-template-expressions': 'off',
  '@typescript-eslint/naming-convention': [
    'error',
    {
      selector: 'typeAlias',
      format: ['PascalCase'],
      custom: {
        regex: '^T[A-Z0-9]',
        match: true
      }
    }
  ],
  '@typescript-eslint/consistent-type-exports': 'error',
  '@typescript-eslint/consistent-type-imports': 'error'
};
