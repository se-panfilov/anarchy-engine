import Ajv from 'ajv';

import type { ILevelConfig } from '@/Engine/Level';
import ILevelConfigSchema from '@/Engine/Level/Schemas/ILevelConfig.json';

const ajv: Ajv = new Ajv();

export function validLevelConfig(config: ILevelConfig): { isValid: boolean; errors?: ReadonlyArray<any> | null | undefined } {
  const validate = ajv.compile(ILevelConfigSchema);
  const isValid: boolean = validate(config);
  return { isValid, errors: validate.errors };
}
