import type { ILevelConfig } from '@Engine/Domains/Level';
import ILevelConfigSchema from '@Engine/Schemas/ILevelConfig.json';
import Ajv from 'ajv';

const ajv: Ajv = new Ajv();

export function isValidLevelConfig(config: ILevelConfig): config is ILevelConfig {
  const validate = ajv.compile(ILevelConfigSchema);
  return validate(config);
}
