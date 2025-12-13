import { ControlsFactory } from '@Engine/Factories';
import { DestroyablePool } from '@Engine/Pool/DestroyablePool';
import { isNotDefined } from '@Engine/Utils';

import type { IDestroyablePool, ISceneFactories, ISceneFactoryPool, ISceneFactoryPoolParams } from './Models';

export function SceneFactoriesPool({ canvas, cameraRegistry }: ISceneFactoryPoolParams): ISceneFactoryPool {
  const abstractPool: IDestroyablePool<ISceneFactories> = DestroyablePool<ISceneFactories>(init);
  const { pool, setPool } = abstractPool;

  function init(): ISceneFactories {
    setPool({
      controlsFactory: ControlsFactory({ canvas, cameraRegistry })
    });

    if (isNotDefined(pool)) throw new Error('Failed to initialize FactoriesPool');

    return pool;
  }

  return { ...abstractPool, init };
}
