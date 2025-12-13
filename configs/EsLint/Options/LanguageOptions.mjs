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
    sourceType: 'module'
  }
};

// TODO DESKTOP: do we need this?
export const vueLanguageOptions = {
  ...languageOptions,
  parserOptions: {
    ...languageOptions.parserOptions,
    extraFileExtensions: ['.vue']
  }
};
