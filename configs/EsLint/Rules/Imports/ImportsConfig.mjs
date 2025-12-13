import { ImportsRules as rules } from './ImportsRules.mjs';
import importPlugin from 'eslint-plugin-import';

export const ImportsConfig = [importPlugin.flatConfigs.errors, importPlugin.flatConfigs.warnings, importPlugin.flatConfigs.typescript, { rules }];
