import eslintJs from '@eslint/js';
import { JsRules as rules } from './JsRules.mjs';
import { JsOverrides as overrides } from './JsOverrides.mjs';

export const JsConfig = [eslintJs.configs.recommended, { rules }, ...overrides];
