import type { ISceneConfig } from '@Engine/Domains/Scene';
import ISceneConfigSchema from '@Engine/Schemas/ISceneConfig.json';
import Ajv from 'ajv';

const ajv: Ajv = new Ajv();

export function isValidSceneConfig(config: ISceneConfig): config is ISceneConfig {
  const validate = ajv.compile(ISceneConfigSchema);
  return validate(config);
}
