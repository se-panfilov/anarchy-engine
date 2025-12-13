import type { IAppCanvas, IFactories, ILaunchedEngine } from '@/Engine';
import { ambientContext, FactoriesPool, isNotDefined } from '@/Engine';

export function launchEngine(canvasSelector: string): ILaunchedEngine {
  const canvas: IAppCanvas | null = ambientContext.container.getCanvasElement(canvasSelector);
  if (isNotDefined(canvas)) throw new Error('Canvas is not defined');
  const factories: IFactories = FactoriesPool().pool;

  return { factories, canvas };
}
