import { AbstractPool } from '@Engine/Domains/Abstract';
import { ActorFactory } from '@Engine/Domains/Actor';
import { CameraFactory } from '@Engine/Domains/Camera';
import { LightFactory } from '@Engine/Domains/Light';
import { LoopFactory } from '@Engine/Domains/Loop';
import { RendererFactory } from '@Engine/Domains/Renderer';
import { SceneFactory } from '@Engine/Domains/Scene';
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
