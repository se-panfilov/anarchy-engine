import type { IDestroyable } from '@/Engine/Mixins';
import type { ISceneConfig, ISceneParams, ISceneWrapper } from '@/Engine/Scene';

export type IScenesService = Readonly<{
  create: (params: ISceneParams) => ISceneWrapper;
  createFromConfig: (config: ISceneConfig) => ISceneWrapper;
  setActiveScene: (scene: ISceneWrapper) => void;
  findActiveScene: () => ISceneWrapper | undefined;
}> &
  IDestroyable;
