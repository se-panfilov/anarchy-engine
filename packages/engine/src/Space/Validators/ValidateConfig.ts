import type { TSpaceConfig } from '@Engine/Space/Models';
import { validSpaceConfig } from '@Engine/Space/Validators';

export function validateConfig(config: TSpaceConfig): void | never {
  const { isValid, errors } = validSpaceConfig(config);
  if (!isValid) {
    // TODO LOGGER: should be forwarded to the errors hub (which is not implemented yet)
    console.error(errors);
    throw new Error('Failed to launch a space: invalid data format');
  }
}
