import { filter } from 'rxjs';

import type { TShowcase } from '@/App/Levels/Models';
import type { TActorAsyncRegistry, TActorWrapperAsync, TAppCanvas, ICameraWrapper, TEngine, IIntersectionEvent, TIntersectionsWatcher, TSpace, TSpaceConfig } from '@/Engine';
import { buildSpaceFromConfig, Engine, isNotDefined, mouseService } from '@/Engine';

import spaceConfig from './showcase.json';

export function showcase(canvas: TAppCanvas): TShowcase {
  const space: TSpace = buildSpaceFromConfig(canvas, spaceConfig as TSpaceConfig);
  const engine: TEngine = Engine(space);
  const { loopService } = engine.services;

  const { actorService, cameraService, intersectionsWatcherService } = space.services;
  const actorRegistry: TActorAsyncRegistry = actorService.getRegistry();

  async function init(): Promise<void> {
    const actor: TActorWrapperAsync | undefined = await actorRegistry.findByTagAsync('intersectable');
    if (isNotDefined(actor)) throw new Error('Actor is not defined');
    actor.setY(2);

    loopService.tick$.subscribe(({ elapsedTime }) => {
      actor.setX(Math.sin(elapsedTime) * 8);
      actor.setZ(Math.cos(elapsedTime) * 8);
    });
  }

  function startIntersections(): void {
    const camera: ICameraWrapper | undefined = cameraService.findActive();
    if (isNotDefined(camera)) throw new Error('Camera is not defined');
    // const actors: ReadonlyArray<IActorWrapperAsync> = actorRegistry.findAllByTags(['intersectable'], LookUpStrategy.Every);
    const intersectionsWatcher: TIntersectionsWatcher = intersectionsWatcherService.create({ camera, actors: [], position$: mouseService.position$, isAutoStart: true, tags: [] });

    actorRegistry.added$.pipe(filter((a: TActorWrapperAsync) => a.hasTag('intersectable'))).subscribe((actor: TActorWrapperAsync): void => intersectionsWatcher.addActor(actor));

    intersectionsWatcher.value$.subscribe((obj: IIntersectionEvent): void => {
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
