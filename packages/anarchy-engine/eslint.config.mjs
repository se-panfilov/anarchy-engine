import { CustomConfig, FunctionalConfig, ignores, ImportsConfig, languageOptions, plugins, TsConfig } from '../../configs/EsLint/index.mjs';
import { createInternalAliasRules } from '../../configs/EsLint/Rules/Imports/InternalAliasRules.mjs';
import { EngineJsConfig } from './configs/EsLint/Js/JsConfig.mjs';

const internalAliasRules = createInternalAliasRules('@Anarchy/Engine', '@hellpig/anarchy-engine');

export default [...EngineJsConfig, ...TsConfig, ...FunctionalConfig, ...ImportsConfig, ...CustomConfig, { languageOptions }, { ignores }, { plugins }, internalAliasRules];
