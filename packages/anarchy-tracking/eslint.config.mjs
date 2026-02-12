import { CustomConfig, FunctionalConfig, ignores, ImportsConfig, JsConfig, languageOptions, plugins, TsConfig } from '../../configs/EsLint/index.mjs';
import { createInternalAliasRules } from '../../configs/EsLint/Rules/Imports/InternalAliasRules.mjs';

const internalAliasRules = createInternalAliasRules('@Anarchy/Tracking', '@hellpig/anarchy-tracking');

export default [...JsConfig, ...TsConfig, ...FunctionalConfig, ...ImportsConfig, ...CustomConfig, { languageOptions }, { ignores }, { plugins }, internalAliasRules];
