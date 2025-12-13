import {
  ActorFactory,
  CameraFactory,
  ControlsFactory,
  LightFactory,
  LoopFactory,
  RendererFactory,
  SceneFactory
} from '@Engine/Factories';
import type { IFactoriesPool, IFactoryPoolParams } from './Models';

export function getFactoriesPool({ canvas, cameraRegistry }: IFactoryPoolParams): IFactoriesPool {
  return {
    sceneFactory: SceneFactory(),
    actorFactory: ActorFactory(),
    cameraFactory: CameraFactory(),
    lightFactory: LightFactory(),
    rendererFactory: RendererFactory(),
    controlsFactory: ControlsFactory({ canvas, cameraRegistry }),
    loopFactory: LoopFactory()
  };
}
