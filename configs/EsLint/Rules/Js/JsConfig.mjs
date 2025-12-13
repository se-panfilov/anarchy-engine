import eslintJs from '@eslint/js';
import { JsRules as rules } from './JsRules.mjs';

export const JsConfig = [eslintJs.configs.recommended, { rules }];
