import { ImportsRules } from './ImportsRules.mjs';
import { SimpleImportRules } from './SimpleImportRules.mjs';
import importPlugin from 'eslint-plugin-import';

const rules = { ...ImportsRules, ...SimpleImportRules };
export const ImportsConfig = [importPlugin.flatConfigs.errors, importPlugin.flatConfigs.warnings, importPlugin.flatConfigs.typescript, { rules }];
