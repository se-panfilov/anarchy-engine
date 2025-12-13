import type { IDestroyable } from '@/Engine/Mixins';

import type { IFogConfig } from './IFogConfig';
import type { IFogParams } from './IFogParams';
import type { IFogWrapper } from './IFogWrapper';

export type IFogService = Readonly<{
  create: (params: IFogParams) => IFogWrapper;
  createFromConfig: (fogs: ReadonlyArray<IFogConfig>) => void;
}> &
  IDestroyable;
