import { ActorFactory, CameraFactory, LightFactory, LoopFactory, RendererFactory, SceneFactory } from '@Engine/Factories';
import { AbstractPool } from '@Engine/Pool/AbstractPool';
import type { IFactoryPool } from '@Engine/Pool/Models/IFactoryPool';

import type { IFactories } from './Models';

export function FactoriesPool(): IFactoryPool {
  return AbstractPool<IFactories>({
    sceneFactory: SceneFactory(),
    actorFactory: ActorFactory(),
    cameraFactory: CameraFactory(),
    lightFactory: LightFactory(),
    rendererFactory: RendererFactory(),
    loopFactory: LoopFactory()
  });
}
