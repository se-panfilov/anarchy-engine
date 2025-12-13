import type { IAppCanvas } from '@Engine/Domains/App';
import type { IFactories } from '@Engine/Pool';

export type ILaunchedEngine = Readonly<{
  factories: IFactories;
  canvas: IAppCanvas;
}>;
