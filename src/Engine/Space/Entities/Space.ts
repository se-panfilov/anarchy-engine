import type { Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged, filter, skip } from 'rxjs';

import type { TAbstractService, TRegistryPack } from '@/Engine/Abstract';
import { AbstractEntity, EntityType } from '@/Engine/Abstract';
import { ambientContext } from '@/Engine/Context';
import type { TGlobalContainerDecorator } from '@/Engine/Global';
import type { TIntersectionsWatcher } from '@/Engine/Intersections';
import type { TLoop } from '@/Engine/Loop';
import { RendererModes } from '@/Engine/Renderer';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TScreenSizeWatcher } from '@/Engine/Screen';
import { CreateEntitiesStrategy } from '@/Engine/Space/Constants';
import type { TSpace, TSpaceBaseServices, TSpaceCanvas, TSpaceHooks, TSpaceLoops, TSpaceParams, TSpaceParts, TSpaceServices } from '@/Engine/Space/Models';
import { buildBaseServices, buildEntitiesServices, createEntities } from '@/Engine/Space/Utils';
import { createLoops } from '@/Engine/Space/Utils/CreateLoopsUtils';
import { findDomElement, findOrCreateCanvas, isCanvasElement, isDefined, isDestroyable, isNotDefined } from '@/Engine/Utils';

export function Space(params: TSpaceParams, hooks?: TSpaceHooks): TSpace {
  const { canvasId, version, name, tags } = params;
  const built$: BehaviorSubject<TSpace | undefined> = new BehaviorSubject<TSpace | undefined>(undefined);
  const start$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  const canvas: TSpaceCanvas = findOrCreateCanvas(canvasId);

  const { services, loops } = initSpaceServices(canvas, params);
  hooks?.afterAllServicesInitialized?.(canvas, services, loops, params);

  services.rendererService.create({ canvas, mode: RendererModes.WebGL2, isActive: true });

  if (isDefined(params.entities) && Object.values(params.entities).length > 0) {
    hooks?.beforeEntitiesCreated?.(params, services, loops);
    createEntities(params.entities, services, CreateEntitiesStrategy.Params);
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

  const getCanvasElement = (): TSpaceCanvas | never => {
    const result: HTMLElement | TSpaceCanvas | null = findDomElement(canvasId);
    if (!isNotDefined(result)) throw new Error(`Space: Can't find canvas element: ${result}`);
    if (!isCanvasElement(result)) throw new Error(`Space: Element (${result}) is found, but it isn't a canvas`);
    return result;
  };

  const space: TSpace = Object.assign(AbstractEntity(parts, EntityType.Space, { version, name, tags }), { getCanvasElement });

  start$.pipe(skip(1), distinctUntilChanged()).subscribe((value: boolean): void => {
    if (value) return Object.values(space.loops).forEach((loop: TLoop): void => loop.start());

    //stop
    if (isNotDefined(space)) throw new Error('Engine is not started yet (space is not defined)');
    Object.values(space.loops).forEach((loop: TLoop): void => loop.stop());

    const { intersectionsWatcherService, screenService } = space.services;

    screenService.watchers.getRegistry().forEach((watcher: TScreenSizeWatcher): void => watcher.stop$.next());
    // TODO 14-0-0: stop all watchers, not only intersections
    void intersectionsWatcherService.getRegistry().forEach((watcher: TIntersectionsWatcher): void => {
      if (watcher.isStarted) watcher.stop$.next();
    });

    return undefined;
  });

  // TODO 14-0-0: Add possibility to drop the whole canvas on destroy
  const destroySub$: Subscription = space.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    // TODO 14-0-0: Stop all watchers on destroy

    built$.complete();
    built$.unsubscribe();
    Object.values(services).forEach((service: TAbstractService): void => void (isDestroyable(service) && service.destroy$.next()));
    Object.values(loops).forEach((service: TLoop): void => void (isDestroyable(service) && service.destroy$.next()));
  });

  // eslint-disable-next-line functional/immutable-data
  const result = Object.assign(space, parts);

  built$.next(result);

  return result;
}

function initSpaceServices(canvas: TSpaceCanvas, params: TSpaceParams, hooks?: TSpaceHooks): { services: TSpaceServices; loops: TSpaceLoops } {
  hooks?.beforeBaseServicesBuilt?.(canvas, params);
  const baseServices: TSpaceBaseServices = buildBaseServices();
  baseServices.screenService.setCanvas(canvas);
  const container: TGlobalContainerDecorator = ambientContext.container;
  const screenSizeWatcher: TScreenSizeWatcher = baseServices.screenService.watchers.create({ container });

  screenSizeWatcher.start$.next();

  baseServices.scenesService.createFromList(params.scenes);
  const sceneW: TSceneWrapper | undefined = baseServices.scenesService.findActive();
  if (isNotDefined(sceneW)) throw new Error(`Cannot find an active scene for space "${params.name}" during space's services initialization.`);

  hooks?.beforeLoopsCreated?.(params);
  const loops: TSpaceLoops = createLoops(baseServices.loopService);

  hooks?.beforeEntitiesServicesBuilt?.(canvas, params);
  const services: TSpaceServices = buildEntitiesServices(sceneW, canvas, loops, baseServices);

  return { services, loops };
}
