import type { IDestroyable } from '@/Engine/Mixins';

import type { ISceneConfig } from './ISceneConfig';
import type { ISceneFactory } from './ISceneFactory';
import type { ISceneParams } from './ISceneParams';
import type { ISceneRegistry } from './ISceneRegistry';
import type { ISceneWrapper } from './ISceneWrapper';

export type IScenesService = Readonly<{
  create: (params: ISceneParams) => ISceneWrapper;
  createFromConfig: (scenes: ReadonlyArray<ISceneConfig>) => void;
  setActiveScene: (scene: ISceneWrapper) => void;
  findActiveScene: () => ISceneWrapper | undefined;
  getFactory: () => ISceneFactory;
  getRegistry: () => ISceneRegistry;
}> &
  IDestroyable;
