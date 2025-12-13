import type { ILoopWrapper } from '@Engine/Domains/Loop';
import type { IRendererWrapper } from '@Engine/Domains/Renderer';

export type ILaunchedScene = Readonly<{
  loop: ILoopWrapper;
  renderer: IRendererWrapper;
  registries: IRegistries;
  factories: IDestroyableFactories;
}>;
