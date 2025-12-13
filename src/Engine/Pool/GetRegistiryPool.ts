import { ActorRegistry, CameraRegistry, ControlsRegistry, LightRegistry } from '@Engine/Registries';
import type { IActorWrapper, ICameraWrapper, ILightWrapper, ISceneWrapper } from '@Engine/Wrappers';
import type { IRegistriesPool } from './Models';

export function getRegistryPool(): IRegistriesPool {
  return {
    actorRegistry: ActorRegistry(),
    cameraRegistry: CameraRegistry(),
    lightRegistry: LightRegistry(),
    controlsRegistry: ControlsRegistry()
  };
}

export function initRegistriesAddSubscription(scene: ISceneWrapper, pool: IRegistriesPool): void {
  pool.actorRegistry.added$.subscribe((actor: IActorWrapper) => scene.addActor(actor));
  pool.cameraRegistry.added$.subscribe((camera: ICameraWrapper) => scene.addCamera(camera));
  pool.lightRegistry.added$.subscribe((light: ILightWrapper) => scene.addLight(light));
}
