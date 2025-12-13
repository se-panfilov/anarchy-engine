import type { Subscription } from 'rxjs';
import { Subject } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractEntity, EntityType } from '@/Engine/Abstract';
import type { TLoop } from '@/Engine/Loop';
import type { TSceneWrapper } from '@/Engine/Scene';
import { screenService } from '@/Engine/Services';
import type { TSpace, TSpaceBaseServices, TSpaceEntities, TSpaceHooks, TSpaceLoops, TSpaceParams, TSpaceServices } from '@/Engine/Space/Models';
import { buildBaseServices, buildEntitiesServices, getActiveScene } from '@/Engine/Space/Utils';
import { createLoops } from '@/Engine/Space/Utils/CreateLoopsUtils';
import type { TWriteable } from '@/Engine/Utils';
import { isDestroyable } from '@/Engine/Utils';

export function Space(params: TSpaceParams, hooks?: TSpaceHooks): TSpace {
  const { canvas, version, name, tags } = params;
  const built$: Subject<void> = new Subject<void>();

  const { services, loops } = initSpaceServices(params, hooks);
  hooks?.afterAllServicesInitialized?.(canvas, services, loops, params);

  // TODO 13-0-0: if we add entities via params, we have to add them to related registries

  const entities: TSpaceEntities = {
    services,
    loops,
    ready: false,
    built$: built$.asObservable()
  };

  built$.subscribe((): void => {
    // eslint-disable-next-line functional/immutable-data
    (entities as TWriteable<TSpaceEntities>).ready = true;
  });

  const space: TSpace = AbstractEntity(entities, EntityType.Space, { version, name, tags });

  const destroySub$: Subscription = space.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    built$.complete();
    built$.unsubscribe();
    Object.values(services).forEach((service: TAbstractService): void => void (isDestroyable(service) && service.destroy$.next()));
    Object.values(loops).forEach((service: TLoop): void => void (isDestroyable(service) && service.destroy$.next()));
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(space, entities);
}

function initSpaceServices(params: TSpaceParams, hooks?: TSpaceHooks): { services: TSpaceServices; loops: TSpaceLoops } {
  // TODO 13-0-0: remove?
  // hooks?.beforeConfigValidation?.(params);
  // validateConfig(config);
  screenService.setCanvas(params.canvas);
  hooks?.beforeBaseServicesBuilt?.(params.canvas, params);
  const baseServices: TSpaceBaseServices = buildBaseServices();
  const sceneW: TSceneWrapper = getActiveScene(params.name, params.scenes, baseServices.scenesService);
  hooks?.beforeLoopsCreated?.(params);
  const loops: TSpaceLoops = createLoops(baseServices.loopService);
  hooks?.beforeEntitiesServicesBuilt?.(params.canvas, params);
  const services: TSpaceServices = buildEntitiesServices(sceneW, params.canvas, loops, baseServices);

  return { services, loops };
}
