import type { TSpaceConfig } from '@hellpig/anarchy-engine/Space/Models';
import { validSpaceConfig } from '@hellpig/anarchy-engine/Space/Validators/SchemasValidator';

export function validateConfig(config: TSpaceConfig): void | never {
  const { isValid, errors } = validSpaceConfig(config);
  if (!isValid) {
    // TODO LOGGER: should be forwarded to the errors hub (which is not implemented yet)
    console.error(errors);
    throw new Error('Failed to launch a space: invalid data format');
  }
}
