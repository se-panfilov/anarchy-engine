import type { IActorWrapper } from '@Engine/Domains/Actor';
import { ActorRegistry } from '@Engine/Domains/Actor';
import type { ICameraWrapper } from '@Engine/Domains/Camera';
import { CameraRegistry } from '@Engine/Domains/Camera';
import { ControlsRegistry } from '@Engine/Domains/Controls';
import { IntersectionsWatcherRegistry } from '@Engine/Domains/Intersections';
import type { ILightWrapper } from '@Engine/Domains/Light';
import { LightRegistry } from '@Engine/Domains/Light';
import { MouseClicksWatcherRegistry, MousePositionWatcherRegistry } from '@Engine/Domains/Mouse';
import type { ISceneWrapper } from '@Engine/Domains/Scene';
import { DestroyablePool } from '@Engine/Pool/Mixins/DestroyablePool';
import { isNotDefined } from '@Engine/Utils';

import type { IDestroyablePool, IRegistries, IRegistryPool } from './Models';
import { ScreenSizeWatcherRegistry } from '@Engine/Domains/Screen';

export function RegistryPool(): IRegistryPool {
  const abstractPool: IDestroyablePool<IRegistries> = DestroyablePool<IRegistries>({
    actorRegistry: ActorRegistry(),
    cameraRegistry: CameraRegistry(),
    lightRegistry: LightRegistry(),
    controlsRegistry: ControlsRegistry(),
    // TODO (S.Panfilov) is this registration needed?
    mouseClicksWatcherRegistry: MouseClicksWatcherRegistry(),
    screenSizeWatcherRegistry: ScreenSizeWatcherRegistry(),
    mousePositionWatcherRegistry: MousePositionWatcherRegistry(),
    intersectionsWatcherRegistry: IntersectionsWatcherRegistry()
  });

  function startAddSubscription(scene: Readonly<ISceneWrapper>): void {
    if (isNotDefined(abstractPool.pool)) throw new Error('Cannot start RegistryPool subscription: pool is not initialized');

    abstractPool.pool.actorRegistry.added$.subscribe((actor: Readonly<IActorWrapper>) => scene.addActor(actor));
    abstractPool.pool.cameraRegistry.added$.subscribe((camera: Readonly<ICameraWrapper>) => scene.addCamera(camera));
    abstractPool.pool.lightRegistry.added$.subscribe((light: Readonly<ILightWrapper>) => scene.addLight(light));
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
