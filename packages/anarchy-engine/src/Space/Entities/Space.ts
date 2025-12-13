import type { TAbstractService, TRegistryPack } from '@Anarchy/Engine/Abstract';
import { AbstractEntity, EntityType } from '@Anarchy/Engine/Abstract';
import { ambientContext } from '@Anarchy/Engine/Context';
import type { TContainerDecorator } from '@Anarchy/Engine/Global';
import { getCanvasContainer } from '@Anarchy/Engine/Global';
import type { TAnyIntersectionsWatcher } from '@Anarchy/Engine/Intersections';
import type { TLoop } from '@Anarchy/Engine/Loop';
import type { TMouseClickWatcher, TMousePositionWatcher } from '@Anarchy/Engine/Mouse';
import type { TSceneWrapper } from '@Anarchy/Engine/Scene';
import { spaceToConfig } from '@Anarchy/Engine/Space/Adapters';
import { CreateEntitiesStrategy, SpaceEvents } from '@Anarchy/Engine/Space/Constants';
import type {
  TSpace,
  TSpaceAnyEvent,
  TSpaceBaseServices,
  TSpaceCanvas,
  TSpaceConfig,
  TSpaceLoops,
  TSpaceParams,
  TSpaceParts,
  TSpaceRegistry,
  TSpaceServices,
  TSpaceSettings
} from '@Anarchy/Engine/Space/Models';
import { buildBaseServices, buildEntitiesServices, createEntities, createLoops } from '@Anarchy/Engine/Space/Utils';
import { findDomElement, getOrCreateCanvasFromSelector, isCanvasElement, isDestroyable, mergeAll } from '@Anarchy/Engine/Utils';
import { isDefined, isNotDefined } from '@Anarchy/Shared/Utils';
import type { Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged, filter, skip, Subject } from 'rxjs';

export function Space(params: TSpaceParams, registry: TSpaceRegistry, settings?: TSpaceSettings): TSpace {
  const { canvasSelector, version, name, tags } = params;
  const built$: BehaviorSubject<TSpace | undefined> = new BehaviorSubject<TSpace | undefined>(undefined);
  const start$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  const events$: Subject<TSpaceAnyEvent> = new Subject<TSpaceAnyEvent>();
  const serializationInProgress$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  const canvas: TSpaceCanvas = getOrCreateCanvasFromSelector(ambientContext, canvasSelector);
  const container: TContainerDecorator = getCanvasContainer(canvas);

  const { services, loops } = initSpaceServices(canvas, container, params, settings, events$);
  events$.next({ name: SpaceEvents.AfterAllServicesInitialized, args: { canvas, services, loops, params } });

  let entitiesCreationPromise: Promise<void> = Promise.resolve();
  if (isDefined(params.entities) && Object.values(params.entities).length > 0) {
    events$.next({ name: SpaceEvents.BeforeEntitiesCreated, args: { params, services, loops } });
    entitiesCreationPromise = createEntities(params.entities, services, container, CreateEntitiesStrategy.Params).then((): void => {
      events$.next({ name: SpaceEvents.AfterEntitiesCreated, args: { params, services, loops } });
      // TODO 14-0-0: Find a better place for this
      services.intersectionsWatcherService.getRegistry().added$.subscribe(({ value }: TRegistryPack<TAnyIntersectionsWatcher>): void => {
        if (value.isAutoStart && !value.isStarted) value.enabled$.next(true);
      });
    });
  }

  const parts: TSpaceParts = {
    services,
    loops,
    built$: built$.pipe(filter(isDefined)),
    start$
  };

  function getCanvasElement(): TSpaceCanvas | never {
    const result: HTMLElement | TSpaceCanvas | null = findDomElement(ambientContext, canvasSelector);
    if (isNotDefined(result)) throw new Error(`Space: Can't find canvas element: ${result}`);
    if (!isCanvasElement(result)) throw new Error(`Space: Element (${result}) is found, but it isn't a canvas`);
    return result;
  }

  function drop(): void {
    space.destroy$.next();
    canvas.remove();
  }

  const space: TSpace = mergeAll(
    AbstractEntity(parts, EntityType.Space, {
      version,
      name,
      tags
    }),
    {
      getCanvasElement,
      container,
      drop,
      version,
      getCanvasSelector: (): string => canvasSelector,
      serializationInProgress$: serializationInProgress$.asObservable(),
      serialize: (): TSpaceConfig => {
        serializationInProgress$.next(true);
        const config: TSpaceConfig = spaceToConfig(space, space.services);
        serializationInProgress$.next(false);
        return config;
      }
    },
    { events$ }
  );

  start$.pipe(skip(1), distinctUntilChanged()).subscribe((value: boolean): void => {
    if (value) return Object.values(space.loops).forEach((loop: TLoop): void => loop.start());

    //stop
    if (isNotDefined(space)) throw new Error('Engine is not started yet (space is not defined)');
    Object.values(space.loops).forEach((loop: TLoop): void => loop.stop());

    stopWatchers(space.services);

    return undefined;
  });

  const destroySub$: Subscription = space.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    container.destroy$.next();

    built$.complete();
    start$.complete();
    serializationInProgress$.complete();
    Object.values(services).forEach((service: TAbstractService): void => void (isDestroyable(service) && service.destroy$.next()));
    Object.values(loops).forEach((loop: TLoop): void => void (isDestroyable(loop) && loop.destroy$.next()));

    registry.remove(space.id);
  });

  // eslint-disable-next-line functional/immutable-data
  const result = Object.assign(space, parts);

  entitiesCreationPromise.then(() => built$.next(result));

  return result;
}

function initSpaceServices(
  canvas: TSpaceCanvas,
  container: TContainerDecorator,
  params: TSpaceParams,
  settings: TSpaceSettings = {},
  events$: Subject<TSpaceAnyEvent>
): {
  services: TSpaceServices;
  loops: TSpaceLoops;
} {
  events$.next({ name: SpaceEvents.BeforeBaseServicesBuilt, args: { canvas, params } });
  const baseServices: TSpaceBaseServices = buildBaseServices();
  container.canvas$.next(canvas);

  baseServices.scenesService.createFromList(params.scenes);
  const sceneW: TSceneWrapper = baseServices.scenesService.getActive();

  events$.next({ name: SpaceEvents.BeforeLoopsCreated, args: { params } });
  const loops: TSpaceLoops = createLoops(baseServices.loopService, settings);

  events$.next({ name: SpaceEvents.BeforeEntitiesServicesBuilt, args: { canvas, params } });
  const services: TSpaceServices = buildEntitiesServices(sceneW, canvas, container, loops, baseServices, settings);

  services.textService.injectStyle();

  return { services, loops };
}

function stopWatchers({ intersectionsWatcherService, mouseService }: TSpaceServices): void {
  mouseService.getMouseClickWatcherRegistry().forEach((watcher: TMouseClickWatcher): void => watcher.enabled$.next(false));
  mouseService.getMousePositionWatcherRegistry().forEach((watcher: TMousePositionWatcher): void => watcher.enabled$.next(true));
  intersectionsWatcherService.getRegistry().forEach((watcher: TAnyIntersectionsWatcher): void => void (watcher.isStarted && watcher.enabled$.next(false)));
}
