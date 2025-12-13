import Ajv from 'ajv';

import type { ISpaceConfig } from '@/Engine/Space';
import ISpaceConfigSchema from '@/Engine/Space/Schemas/ISpaceConfig.json';

const ajv: Ajv = new Ajv();

export function validLevelConfig(config: ISpaceConfig): { isValid: boolean; errors?: ReadonlyArray<any> | null | undefined } {
  const validationResult = validateJsonSchema(config);
  return validationResult;
}

function validateJsonSchema(config: ISpaceConfig): { isValid: boolean; errors?: ReadonlyArray<any> | null | undefined } {
  const validate = ajv.compile(ISpaceConfigSchema);
  const isValid: boolean = validate(config);
  return { isValid, errors: validate.errors };
}

function validateData(): boolean {
  //at least one active entity for withActiveEntities
  //no multiple active entities for withActiveEntities
  //at least one scene
}
