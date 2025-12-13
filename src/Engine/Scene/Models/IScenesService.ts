import type { IDestroyable } from '@/Engine/Mixins';
import type { ISceneConfig, ISceneParams, ISceneWrapper } from '@/Engine/Scene';

export type IScenesService = Readonly<{
  create: (params: ISceneParams) => ISceneWrapper;
  createFromConfig: (scenes: ReadonlyArray<ISceneConfig>) => void;
  setActiveScene: (scene: ISceneWrapper) => void;
  findActiveScene: () => ISceneWrapper | undefined;
}> &
  IDestroyable;
