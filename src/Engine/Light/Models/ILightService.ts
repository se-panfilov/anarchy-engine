import type { IDestroyable } from '@/Engine/Mixins';
import type { ISceneWrapper } from '@/Engine/Scene';

import type { IAbstractLightWrapper } from './IAbstractLightWrapper';
import type { ILight } from './ILight';
import type { ILightConfig } from './ILightConfig';
import type { ILightFactory } from './ILightFactory';
import type { ILightParams } from './ILightParams';
import type { ILightRegistry } from './ILightRegistry';

export type ILightService = Readonly<{
  create: (params: ILightParams) => IAbstractLightWrapper<ILight>;
  createFromConfig: (lights: ReadonlyArray<ILightConfig>) => void;
  getFactory: () => ILightFactory;
  getRegistry: () => ILightRegistry;
  getScene: () => ISceneWrapper;
}> &
  IDestroyable;
