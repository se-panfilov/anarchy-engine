import { DestroyablePool } from '@Engine/Pool/DestroyablePool';
import { ActorRegistry, CameraRegistry, ControlsRegistry, LightRegistry, MouseClicksWatcherRegistry, ScreenSizeWatcherRegistry, MousePositionWatcherRegistry } from '@Engine/Registries';
import { isNotDefined } from '@Engine/Utils';
import type { IActorWrapper, ICameraWrapper, ILightWrapper, ISceneWrapper } from '@Engine/Wrappers';

import type { IDestroyablePool, IRegistries, IRegistryPool } from './Models';

export function RegistryPool(): IRegistryPool {
  const abstractPool: IDestroyablePool<IRegistries> = DestroyablePool<IRegistries>({
    actorRegistry: ActorRegistry(),
    cameraRegistry: CameraRegistry(),
    lightRegistry: LightRegistry(),
    controlsRegistry: ControlsRegistry(),
    // TODO (S.Panfilov) is this registration needed?
    mouseClicksWatcherRegistry: MouseClicksWatcherRegistry(),
    screenSizeWatcherRegistry: ScreenSizeWatcherRegistry(),
    mousePositionWatcherRegistry: MousePositionWatcherRegistry()
  });

  function startAddSubscription(scene: ISceneWrapper): void {
    if (isNotDefined(abstractPool.pool)) throw new Error('Cannot start RegistryPool subscription: pool is not initialized');

    abstractPool.pool.actorRegistry.added$.subscribe((actor: IActorWrapper) => scene.addActor(actor));
    abstractPool.pool.cameraRegistry.added$.subscribe((camera: ICameraWrapper) => scene.addCamera(camera));
    abstractPool.pool.lightRegistry.added$.subscribe((light: ILightWrapper) => scene.addLight(light));
  }

  function destroy(): void {
    if (isNotDefined(abstractPool.pool)) return;
    abstractPool.destroy();
    abstractPool.pool.actorRegistry.added$.unsubscribe();
    abstractPool.pool.cameraRegistry.added$.unsubscribe();
    abstractPool.pool.lightRegistry.added$.unsubscribe();
    abstractPool.pool.mouseClicksWatcherRegistry.added$.unsubscribe();
  }

  return { ...abstractPool, startAddSubscription, destroy };
}
