import { FunctionalRules as rules } from './FunctionalRules.mjs';
import functional from 'eslint-plugin-functional';
import eslintTs from 'typescript-eslint';

export const FunctionalConfig = [
  functional.configs.recommended,
  functional.configs.stylistic,
  // {
  //   languageOptions: {
  //     parserOptions: {
  //       parser: eslintTs,
  //       projectService: true,
  //       tsConfig: import.meta.dirname
  //     }
  //   }
  // },
  { rules }
];
