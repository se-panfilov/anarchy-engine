import type { ISpaceInitializationConfig } from '@/Engine/Space/Models/ISpaceInitializationConfig';
import { isBoolean, isDefined } from '@/Engine/Utils';

export const isSpaceInitializationConfig = (initSpace: boolean | ISpaceInitializationConfig): initSpace is ISpaceInitializationConfig => typeof initSpace === 'object';

export function getBoolValue(key: keyof ISpaceInitializationConfig, initSpace: boolean | ISpaceInitializationConfig): boolean {
  if (isBoolean(initSpace)) return initSpace;
  if (isSpaceInitializationConfig(initSpace) && isDefined(initSpace[key])) return Boolean(initSpace[key]);
  return false;
}
