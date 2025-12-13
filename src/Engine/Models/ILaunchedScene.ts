import type { IDestroyableFactories, IRegistries } from '@Engine/Pool';
import type { ILoopWrapper, IRendererWrapper } from '@Engine/Wrappers';

export type ILaunchedScene = Readonly<{
  loop: ILoopWrapper;
  renderer: IRendererWrapper;
  registries: IRegistries;
  factories: IDestroyableFactories;
}>;
