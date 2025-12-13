import type { IAppCanvas } from '@Engine/Models/IAppCanvas';
import type { IFactories } from '@Engine/Pool';

export type ILaunchedEngine = Readonly<{
  factories: IFactories;
  canvas: IAppCanvas;
}>;
