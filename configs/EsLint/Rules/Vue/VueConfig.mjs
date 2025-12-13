import pluginVue from 'eslint-plugin-vue';
import eslintTs from 'typescript-eslint';
import { VueRules as rules } from './VueRules.mjs';

export const VueConfig = [
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: eslintTs.parser
      }
    },
    rules
  }
];
