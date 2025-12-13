import { FunctionalConfig, ignores, ImportsConfig, JsConfig, languageOptions, plugins, TsConfig } from './configs/EsLint/index.mjs';

export default [...JsConfig, ...TsConfig, ...FunctionalConfig, ...ImportsConfig, { languageOptions }, { ignores }, { plugins }];
