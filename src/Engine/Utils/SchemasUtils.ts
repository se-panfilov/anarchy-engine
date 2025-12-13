import Ajv from 'ajv';
import type { ISceneConfig } from '@Engine/Launcher/Models';
import ISceneConfigSchema from '@Engine/Schemas/ISceneConfig.json';

const ajv: Ajv = new Ajv();

export function isValidSceneConfig(config: ISceneConfig | unknown): config is ISceneConfig {
  const validate = ajv.compile(ISceneConfigSchema);
  return validate(config);
}
