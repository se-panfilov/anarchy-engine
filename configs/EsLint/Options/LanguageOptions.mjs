import eslintTs from 'typescript-eslint';
import globals from 'globals';

export const languageOptions = {
  globals: {
    ...globals.node,
    ...globals.browser
  },
  ecmaVersion: 'latest',
  sourceType: 'module',
  parserOptions: {
    parser: eslintTs.parser,
    project: ['./tsconfig.json'],
    sourceType: 'module',
    extraFileExtensions: ['.vue']
  }
};
