import type { IAppCanvas } from '@Engine/Models/IAppCanvas';
import type { IRegistriesPool } from '@Engine/Pool';
import type { ILoopWrapper, IRendererWrapper } from '@Engine/Wrappers';

export type IStartedScene = Readonly<{
  loop: ILoopWrapper;
  renderer: IRendererWrapper;
  registryPool: IRegistriesPool;
  canvas: IAppCanvas;
  destroy: () => void;
}>;
