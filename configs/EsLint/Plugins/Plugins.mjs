import sortExportAll from 'eslint-plugin-sort-export-all';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

import tsPlugin from '@typescript-eslint/eslint-plugin';
import functionalPlugin from 'eslint-plugin-functional';
import { NoSpread } from '../Rules/Custom/NoSpread.mjs';

export const plugins = {
  'simple-import-sort': simpleImportSort,
  '@typescript-eslint': tsPlugin,
  functional: functionalPlugin,
  'sort-export-all': sortExportAll,
  'custom-rules': {
    rules: {
      'no-spread': NoSpread
    }
  }
};
