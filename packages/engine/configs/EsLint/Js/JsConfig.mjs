import { JsConfig } from '../../../../../configs/EsLint/index.mjs';
import { JsOverrides as overrides } from './JsOverrides.mjs';

export const EngineJsConfig = [...BaseJsConfig, ...overrides];
