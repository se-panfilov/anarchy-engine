import { CustomConfig, FunctionalConfig, ignores, ImportsConfig, languageOptions, plugins, TsConfig } from '../../configs/EsLint/index.mjs';
import { EngineJsConfig } from './configs/EsLint/Js/JsConfig.mjs';

export default [...EngineJsConfig, ...TsConfig, ...FunctionalConfig, ...ImportsConfig, ...CustomConfig, { languageOptions }, { ignores }, { plugins }];
