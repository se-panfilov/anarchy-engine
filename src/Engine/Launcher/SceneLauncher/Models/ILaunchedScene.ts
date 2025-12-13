import type { ILoopWrapper } from '@Engine/Domains/Loop';
import type { IRendererWrapper } from '@Engine/Domains/Renderer';
import type { IDestroyableFactories, IRegistries } from '@Engine/Pool';

export type ILaunchedScene = Readonly<{
  loop: ILoopWrapper;
  renderer: IRendererWrapper;
  registries: IRegistries;
  factories: IDestroyableFactories;
}>;
