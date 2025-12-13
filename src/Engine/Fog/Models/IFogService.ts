import type { IDestroyable } from '@/Engine/Mixins';

import type { IFogParams } from './IFogParams';
import type { IFogWrapper } from './IFogWrapper';

export type IFogService = Readonly<{
  createFog: (params: IFogParams) => IFogWrapper;
}> &
  IDestroyable;
