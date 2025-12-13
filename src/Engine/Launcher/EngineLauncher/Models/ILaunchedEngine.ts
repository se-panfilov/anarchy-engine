import type { IAppCanvas } from '@Engine/Domains/App';

export type ILaunchedEngine = Readonly<{
  factories: IFactories;
  canvas: IAppCanvas;
}>;
