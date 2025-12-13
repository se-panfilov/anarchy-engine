import type { ILevelConfig } from '@Engine/Domains/Scene';
import ISceneConfigSchema from '@Engine/Schemas/ISceneConfig.json';
import Ajv from 'ajv';

const ajv: Ajv = new Ajv();

export function isValidLevelConfig(config: ILevelConfig): config is ILevelConfig {
  const validate = ajv.compile(ISceneConfigSchema);
  return validate(config);
}
