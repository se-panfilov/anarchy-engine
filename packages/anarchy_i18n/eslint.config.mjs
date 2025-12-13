import { CustomConfig, FunctionalConfig, ignores, ImportsConfig, JsConfig, languageOptions, plugins, TsConfig } from '../../configs/EsLint/index.mjs';

export default [...JsConfig, ...TsConfig, ...FunctionalConfig, ...ImportsConfig, ...CustomConfig, { languageOptions }, { ignores }, { plugins }];
