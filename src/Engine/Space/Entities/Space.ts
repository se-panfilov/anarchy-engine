import type { Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged, filter, skip } from 'rxjs';

import type { TAbstractService, TRegistryPack } from '@/Engine/Abstract';
import { AbstractEntity, EntityType } from '@/Engine/Abstract';
import type { TContainerDecorator } from '@/Engine/Global';
import type { TIntersectionsWatcher } from '@/Engine/Intersections';
import type { TLoop } from '@/Engine/Loop';
import type { TMouseClickWatcher, TMousePositionWatcher } from '@/Engine/Mouse';
import type { TSceneWrapper } from '@/Engine/Scene';
import { spaceToConfig } from '@/Engine/Space/Adapters';
import { CreateEntitiesStrategy } from '@/Engine/Space/Constants';
import type { TSpace, TSpaceBaseServices, TSpaceCanvas, TSpaceConfig, TSpaceHooks, TSpaceLoops, TSpaceParams, TSpaceParts, TSpaceServices } from '@/Engine/Space/Models';
import { buildBaseServices, buildEntitiesServices, createEntities, createLoops } from '@/Engine/Space/Utils';
import { findDomElement, getCanvasContainer, getOrCreateCanvasFromSelector, isCanvasElement, isDefined, isDestroyable, isNotDefined } from '@/Engine/Utils';

export function Space(params: TSpaceParams, hooks?: TSpaceHooks): TSpace {
  const { canvasSelector, version, name, tags } = params;
  const built$: BehaviorSubject<TSpace | undefined> = new BehaviorSubject<TSpace | undefined>(undefined);
  const start$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  const canvas: TSpaceCanvas = getOrCreateCanvasFromSelector(canvasSelector);
  const container: TContainerDecorator = getCanvasContainer(canvas);

  const { services, loops } = initSpaceServices(canvas, container, params);
  hooks?.afterAllServicesInitialized?.(canvas, services, loops, params);

  if (isDefined(params.entities) && Object.values(params.entities).length > 0) {
    hooks?.beforeEntitiesCreated?.(params, services, loops);
    createEntities(params.entities, services, container, CreateEntitiesStrategy.Params);
    hooks?.afterEntitiesCreated?.(params, services, loops);

    // TODO 14-0-0: Find a better place for this
    services.intersectionsWatcherService.getRegistry().added$.subscribe(({ value }: TRegistryPack<TIntersectionsWatcher>): void => {
      if (value.isAutoStart && !value.isStarted) value.start$.next();
    });
  }

  const parts: TSpaceParts = {
    services,
    loops,
    built$: built$.pipe(filter(isDefined)),
    start$
  };

  function getCanvasElement(): TSpaceCanvas | never {
    const result: HTMLElement | TSpaceCanvas | null = findDomElement(canvasSelector);
    if (isNotDefined(result)) throw new Error(`Space: Can't find canvas element: ${result}`);
    if (!isCanvasElement(result)) throw new Error(`Space: Element (${result}) is found, but it isn't a canvas`);
    return result;
  }

  function drop(): void {
    space.destroy$.next();
    canvas.remove();
  }

  const space: TSpace = Object.assign(
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
      serialize: (): TSpaceConfig => spaceToConfig(space, space.services)
    }
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
    Object.values(services).forEach((service: TAbstractService): void => void (isDestroyable(service) && service.destroy$.next()));
    Object.values(loops).forEach((loop: TLoop): void => void (isDestroyable(loop) && loop.destroy$.next()));
  });

  // eslint-disable-next-line functional/immutable-data
  const result = Object.assign(space, parts);

  built$.next(result);

  return result;
}

function initSpaceServices(
  canvas: TSpaceCanvas,
  container: TContainerDecorator,
  params: TSpaceParams,
  hooks?: TSpaceHooks
): {
  services: TSpaceServices;
  loops: TSpaceLoops;
} {
  hooks?.beforeBaseServicesBuilt?.(canvas, params);
  const baseServices: TSpaceBaseServices = buildBaseServices();
  container.canvas$.next(canvas);

  baseServices.scenesService.createFromList(params.scenes);
  const sceneW: TSceneWrapper | undefined = baseServices.scenesService.findActive();
  if (isNotDefined(sceneW)) throw new Error(`Cannot find an active scene for space "${params.name}" during space's services initialization.`);

  hooks?.beforeLoopsCreated?.(params);
  const loops: TSpaceLoops = createLoops(baseServices.loopService);

  hooks?.beforeEntitiesServicesBuilt?.(canvas, params);
  const services: TSpaceServices = buildEntitiesServices(sceneW, canvas, container, loops, baseServices);

  return { services, loops };
}

function stopWatchers({ intersectionsWatcherService, mouseService }: TSpaceServices): void {
  mouseService.getMouseClickWatcherRegistry().forEach((watcher: TMouseClickWatcher): void => watcher.stop$.next());
  mouseService.getMousePositionWatcherRegistry().forEach((watcher: TMousePositionWatcher): void => watcher.stop$.next());
  intersectionsWatcherService.getRegistry().forEach((watcher: TIntersectionsWatcher): void => void (watcher.isStarted && watcher.stop$.next()));
}
