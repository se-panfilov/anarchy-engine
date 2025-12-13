import type { IDestroyable } from '@/Engine/Mixins';
import type { ISceneWrapper } from '@/Engine/Scene';

import type { IFogConfig } from './IFogConfig';
import type { IFogFactory } from './IFogFactory';
import type { IFogParams } from './IFogParams';
import type { IFogRegistry } from './IFogRegistry';
import type { IFogWrapper } from './IFogWrapper';

export type IFogService = Readonly<{
  create: (params: IFogParams) => IFogWrapper;
  createFromConfig: (fogs: ReadonlyArray<IFogConfig>) => void;
  getFactory: () => IFogFactory;
  getRegistry: () => IFogRegistry;
  getScene: () => ISceneWrapper;
}> &
  IDestroyable;
