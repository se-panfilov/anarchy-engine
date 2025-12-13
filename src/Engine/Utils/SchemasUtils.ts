import Ajv from 'ajv';

import type { ILevelConfig } from '@/Engine/Level';
import ILevelConfigSchema from '@/Engine/Level/Schemas/ILevelConfig.json';

const ajv: Ajv = new Ajv();

export function isValidLevelConfig(config: ILevelConfig): config is ILevelConfig {
  const validate = ajv.compile(ILevelConfigSchema);
  return validate(config);
}
