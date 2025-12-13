import type { IAppCanvas, IFactories } from '@/Engine';

export type ILaunchedEngine = Readonly<{
  factories: IFactories;
  canvas: IAppCanvas;
}>;
