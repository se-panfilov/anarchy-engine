import { ControlsFactory } from '@Engine/Factories';
import { AbstractPool } from '@Engine/Pool/AbstractPool';
import { DestroyablePool } from '@Engine/Pool/DestroyablePool';
import { isNotDefined } from '@Engine/Utils';

import type { IAbstractPool, ISceneFactories, ISceneFactoryPool, ISceneFactoryPoolParams } from './Models';

export function SceneFactoriesPool({ canvas, cameraRegistry }: ISceneFactoryPoolParams): ISceneFactoryPool {
  const abstractPool: IAbstractPool<ISceneFactories> = DestroyablePool<ISceneFactories>(init);
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
