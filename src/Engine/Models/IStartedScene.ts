import type { IRegistryPool, ISceneFactories } from '@Engine/Pool';
import type { ILoopWrapper, IRendererWrapper } from '@Engine/Wrappers';

export type IStartedScene = Readonly<{
  loop: ILoopWrapper;
  renderer: IRendererWrapper;
  registryPool: IRegistryPool;
  sceneFactories: ISceneFactories;
}>;
