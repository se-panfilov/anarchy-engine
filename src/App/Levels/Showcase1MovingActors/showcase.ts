import { filter } from 'rxjs';

import type { TShowcase } from '@/App/Levels/Models';
import type { TActorRegistry, TActorWrapper, TAppCanvas, TCameraWrapper, TEngine, TIntersectionEvent, TIntersectionsWatcher, TSpace, TSpaceConfig } from '@/Engine';
import { Engine, isNotDefined, spaceService } from '@/Engine';

import spaceConfig from './showcase.json';

export async function showcase(canvas: TAppCanvas): Promise<TShowcase> {
  const space: TSpace = await spaceService.buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);

  const { actorService, cameraService, intersectionsWatcherService, loopService, mouseService } = space.services;
  const actorRegistry: TActorRegistry = actorService.getRegistry();

  function init(): void {
    const actor: TActorWrapper | undefined = actorRegistry.findByTag('intersectable');
    if (isNotDefined(actor)) throw new Error('Actor is not defined');
    actor.setY(2);

    loopService.tick$.subscribe(({ elapsedTime }) => {
      actor.setX(Math.sin(elapsedTime) * 8);
      actor.setZ(Math.cos(elapsedTime) * 8);
    });
  }

  function startIntersections(): void {
    const camera: TCameraWrapper | undefined = cameraService.findActive();
    if (isNotDefined(camera)) throw new Error('Camera is not defined');
    // const actors: ReadonlyArray<IActorWrapperAsync> = actorRegistry.findAllByTags(['intersectable'], LookUpStrategy.Every);
    const intersectionsWatcher: TIntersectionsWatcher = intersectionsWatcherService.create({ camera, actors: [], position$: mouseService.position$, isAutoStart: true, tags: [] });

    actorRegistry.added$.pipe(filter((a: TActorWrapper) => a.hasTag('intersectable'))).subscribe((actor: TActorWrapper): void => intersectionsWatcher.addActor(actor));

    intersectionsWatcher.value$.subscribe((obj: TIntersectionEvent): void => {
      console.log('intersect obj', obj);
    });

    mouseService.clickLeftRelease$.subscribe((): void => {
      console.log('int click:');
    });

    intersectionsWatcher.start();
  }

  function start(): void {
    engine.start();
    void init();
    startIntersections();
  }

  return { start, space };
}
