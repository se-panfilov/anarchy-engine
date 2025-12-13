import type { IDestroyable } from '@/Engine/Mixins';

import type { IAbstractLightWrapper } from './IAbstractLightWrapper';
import type { ILight } from './ILight';
import type { ILightConfig } from './ILightConfig';
import type { ILightParams } from './ILightParams';

export type ILightService = Readonly<{
  create: (params: ILightParams) => IAbstractLightWrapper<ILight>;
  createFromConfig: (lights: ReadonlyArray<ILightConfig>) => void;
}> &
  IDestroyable;
