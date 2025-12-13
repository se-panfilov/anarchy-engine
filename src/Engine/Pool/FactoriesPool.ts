import { ActorFactory, CameraFactory, LightFactory, LoopFactory, RendererFactory, SceneFactory } from '@Engine/Factories';
import { AbstractPool } from '@Engine/Pool/AbstractPool';
import type { IFactoryPool } from '@Engine/Pool/Models/IFactoryPool';
import { isNotDefined } from '@Engine/Utils';

import type { IAbstractPool, IFactories } from './Models';

export function FactoriesPool(): IFactoryPool {
  const abstractPool: IAbstractPool<IFactories> = AbstractPool<IFactories>(init);
  const { pool, setPool } = abstractPool;

  function init(): IFactories {
    setPool({
      sceneFactory: SceneFactory(),
      actorFactory: ActorFactory(),
      cameraFactory: CameraFactory(),
      lightFactory: LightFactory(),
      rendererFactory: RendererFactory(),
      loopFactory: LoopFactory()
    });

    if (isNotDefined(pool)) throw new Error('Failed to initialize FactoriesPool');

    return pool;
  }

  return { ...abstractPool, init };
}
