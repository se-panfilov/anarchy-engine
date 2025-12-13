import { DestroyablePool } from '@Engine/Pool/DestroyablePool';
import { ActorRegistry, CameraRegistry, ControlsRegistry, LightRegistry } from '@Engine/Registries';
import { isNotDefined } from '@Engine/Utils';
import type { IActorWrapper, ICameraWrapper, ILightWrapper, ISceneWrapper } from '@Engine/Wrappers';

import type { IDestroyablePool, IRegistries, IRegistryPool } from './Models';

export function RegistryPool(): IRegistryPool {
  const abstractPool: IDestroyablePool<IRegistries> = DestroyablePool<IRegistries>(init);
  const { pool, setPool } = abstractPool;

  function init(): IRegistries {
    setPool({
      actorRegistry: ActorRegistry(),
      cameraRegistry: CameraRegistry(),
      lightRegistry: LightRegistry(),
      controlsRegistry: ControlsRegistry()
    });

    if (isNotDefined(pool)) throw new Error('Failed to initialize RegistryPool');

    return pool;
  }

  function startAddSubscription(scene: ISceneWrapper): void {
    if (isNotDefined(pool)) throw new Error('Cannot start RegistryPool subscription: pool is not initialized');

    pool.actorRegistry.added$.subscribe((actor: IActorWrapper) => scene.addActor(actor));
    pool.cameraRegistry.added$.subscribe((camera: ICameraWrapper) => scene.addCamera(camera));
    pool.lightRegistry.added$.subscribe((light: ILightWrapper) => scene.addLight(light));
  }

  // TODO (S.Panfilov) fix destroy
  function destroy(): void {
    if (isNotDefined(pool)) return;
    abstractPool.destroy();
    pool.actorRegistry.added$.unsubscribe();
    pool.cameraRegistry.added$.unsubscribe();
    pool.lightRegistry.added$.unsubscribe();
  }

  return { ...abstractPool, init, startAddSubscription, destroy };
}
