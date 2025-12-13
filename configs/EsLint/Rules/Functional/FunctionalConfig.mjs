import { FunctionalRules as rules } from './FunctionalRules.mjs';
import functional from 'eslint-plugin-functional';

export const FunctionalConfig = [functional.configs.recommended, functional.configs.stylistic, { rules }];
