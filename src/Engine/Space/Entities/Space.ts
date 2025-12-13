import type { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractEntity, EntityType } from '@/Engine/Abstract';
import type { TLoop } from '@/Engine/Loop';
import type { TSceneWrapper } from '@/Engine/Scene';
import { screenService } from '@/Engine/Services';
import type { TSpace, TSpaceBaseServices, TSpaceEntities, TSpaceHooks, TSpaceLoops, TSpaceParams, TSpaceServices } from '@/Engine/Space/Models';
import { buildBaseServices, buildEntitiesServices, getActiveScene } from '@/Engine/Space/Utils';
import { createLoops } from '@/Engine/Space/Utils/CreateLoopsUtils';
import { isDestroyable } from '@/Engine/Utils';

export function Space(params: TSpaceParams, hooks?: TSpaceHooks): TSpace {
  const { canvas, version, name, tags } = params;
  const built$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  const { services, loops } = initSpaceServices(params, hooks);
  hooks?.afterAllServicesInitialized?.(canvas, services, loops, params);

  // TODO 13-0-0: if we add entities via params, we have to add them to related registries

  const entities: TSpaceEntities = {
    services,
    loops,
    built$
  };

  const space: TSpace = AbstractEntity(entities, EntityType.Space, { version, name, tags });

  // TODO 13-0-0: Add possibility to drop while canvas on destroy

  const destroySub$: Subscription = space.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    built$.complete();
    built$.unsubscribe();
    Object.values(services).forEach((service: TAbstractService): void => void (isDestroyable(service) && service.destroy$.next()));
    Object.values(loops).forEach((service: TLoop): void => void (isDestroyable(service) && service.destroy$.next()));
  });

  // eslint-disable-next-line functional/immutable-data
  const result = Object.assign(space, entities);

  built$.next(true);

  return result;
}

function initSpaceServices(params: TSpaceParams, hooks?: TSpaceHooks): { services: TSpaceServices; loops: TSpaceLoops } {
  // TODO 13-0-0: remove?
  // hooks?.beforeConfigValidation?.(params);
  // validateConfig(config);
  screenService.setCanvas(params.canvas);
  hooks?.beforeBaseServicesBuilt?.(params.canvas, params);
  const baseServices: TSpaceBaseServices = buildBaseServices();
  const sceneW: TSceneWrapper = getActiveScene(params.name, baseServices.scenesService);
  hooks?.beforeLoopsCreated?.(params);
  const loops: TSpaceLoops = createLoops(baseServices.loopService);
  hooks?.beforeEntitiesServicesBuilt?.(params.canvas, params);
  const services: TSpaceServices = buildEntitiesServices(sceneW, params.canvas, loops, baseServices);

  return { services, loops };
}
