import { ambientContext } from '@Engine/Context';
import type { IAppCanvas } from '@Engine/Domains/App';
import type { ILaunchedEngine } from '@Engine/Launcher';
import type { IFactories } from '@Engine/Pool';
import { FactoriesPool } from '@Engine/Pool';
import { isNotDefined } from '@Engine/Utils';

export function launchEngine(canvasSelector: string): ILaunchedEngine {
  const canvas: IAppCanvas | null = ambientContext.container.getCanvasElement(canvasSelector);
  if (isNotDefined(canvas)) throw new Error('Canvas is not defined');
  const factories: IFactories = FactoriesPool().pool;

  return { factories, canvas };
}
