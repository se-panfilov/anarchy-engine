import esLintTs from 'typescript-eslint';
import { TsRules as rules } from './TsRules.mjs';

export const TsConfig = [...esLintTs.configs.recommended, { rules }];
