import { CustomConfig, FunctionalConfig, ignores, ImportsConfig, JsConfig, languageOptions, plugins, TsConfig, VueConfig } from '../../configs/EsLint/index.mjs';

export default [...JsConfig, ...TsConfig, ...FunctionalConfig, ...ImportsConfig, ...CustomConfig, ...VueConfig, { languageOptions }, { ignores }, { plugins }];
