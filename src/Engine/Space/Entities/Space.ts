import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, distinctUntilChanged, skip, Subject } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractEntity, EntityType } from '@/Engine/Abstract';
import type { TIntersectionsWatcher } from '@/Engine/Intersections';
import type { TLoop } from '@/Engine/Loop';
import { RendererModes } from '@/Engine/Renderer';
import type { TSceneWrapper } from '@/Engine/Scene';
import { screenService } from '@/Engine/Services';
import { CreateEntitiesStrategy } from '@/Engine/Space/Constants';
import type { TSpace, TSpaceBaseServices, TSpaceHooks, TSpaceLoops, TSpaceParams, TSpaceParts, TSpaceServices } from '@/Engine/Space/Models';
import { buildBaseServices, buildEntitiesServices, createEntities } from '@/Engine/Space/Utils';
import { createLoops } from '@/Engine/Space/Utils/CreateLoopsUtils';
import { isDefined, isDestroyable, isNotDefined } from '@/Engine/Utils';

export function Space(params: TSpaceParams, hooks?: TSpaceHooks): TSpace {
  const { canvas, version, name, tags } = params;
  const built$: BehaviorSubject<TSpace | undefined> = new BehaviorSubject<TSpace | undefined>(undefined);
  const start$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  screenService.setCanvas(params.canvas);

  const { services, loops } = initSpaceServices(params);
  hooks?.afterAllServicesInitialized?.(canvas, services, loops, params);

  services.rendererService.create({ canvas: params.canvas, mode: RendererModes.WebGL2, isActive: true });

  if (isDefined(params.entities) && Object.values(params.entities).length > 0) {
    hooks?.beforeEntitiesCreated?.(params, services, loops);
    createEntities(params.entities, services, CreateEntitiesStrategy.Params);
    hooks?.afterEntitiesCreated?.(params, services, loops);
  }

  const parts: TSpaceParts = {
    services,
    loops,
    built$: built$.asObservable(), //.pipe(skip(1)) as Observable<TSpace>,
    start$
  };

  const space: TSpace = AbstractEntity(parts, EntityType.Space, { version, name, tags });

  start$.pipe(distinctUntilChanged()).subscribe((value: boolean): void => {
    if (value) return Object.values(space.loops).forEach((loop: TLoop): void => loop.start());

    //stop
    if (isNotDefined(space)) throw new Error('Engine is not started yet (space is not defined)');
    const { intersectionsWatcherService } = space.services;
    Object.values(space.loops).forEach((loop: TLoop): void => loop.stop());
    // TODO 14-0-0: stop all watchers, not only intersections
    void intersectionsWatcherService.getRegistry().forEach((watcher: TIntersectionsWatcher): void => {
      if (watcher.isStarted) watcher.stop$.next();
    });

    return undefined;
  });

  // TODO 13-0-0: Add possibility to drop the whole canvas on destroy
  const destroySub$: Subscription = space.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

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

// TODO 13-0-0: Find a better place for this function
function initSpaceServices(params: TSpaceParams, hooks?: TSpaceHooks): { services: TSpaceServices; loops: TSpaceLoops } {
  hooks?.beforeBaseServicesBuilt?.(params.canvas, params);
  const baseServices: TSpaceBaseServices = buildBaseServices();

  baseServices.scenesService.createFromList(params.scenes);
  const sceneW: TSceneWrapper | undefined = baseServices.scenesService.findActive();
  if (isNotDefined(sceneW)) throw new Error(`Cannot find an active scene for space "${params.name}" during space's services initialization.`);

  // TODO create loops only from config
  hooks?.beforeLoopsCreated?.(params);
  const loops: TSpaceLoops = createLoops(baseServices.loopService);

  hooks?.beforeEntitiesServicesBuilt?.(params.canvas, params);
  const services: TSpaceServices = buildEntitiesServices(sceneW, params.canvas, loops, baseServices);

  return { services, loops };
}
