import type { ICameraWrapper } from '@Engine/Wrappers';
import type { IProtectedRegistry } from '@Engine/Models';
import { IAbstractRegistry } from '@Engine/Models';

export type ICameraRegistry = IProtectedRegistry<ICameraWrapper, IAbstractRegistry<ICameraWrapper>> & {
  readonly getByTag(id: string): ICameraWrapper | never;
};
