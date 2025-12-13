import type { Subscription } from 'rxjs';
import { Subject } from 'rxjs';

import type { TAbstractService, TEntity } from '@/Engine/Abstract';
import { AbstractEntity, EntityType } from '@/Engine/Abstract';
import type { TLoop } from '@/Engine/Loop';
import { RendererModes } from '@/Engine/Renderer';
import type { TSceneWrapper } from '@/Engine/Scene';
import { screenService } from '@/Engine/Services';
import type { TSpace, TSpaceBaseServices, TSpaceEntities, TSpaceLoops, TSpaceParams, TSpaceServices } from '@/Engine/Space/Models';
import { buildBaseServices, buildEntitiesServices, createEntitiesFromConfig, getActiveScene, loadResourcesFromConfig } from '@/Engine/Space/Utils';
import { createLoops } from '@/Engine/Space/Utils/CreateLoopsUtils';
import type { TWriteable } from '@/Engine/Utils';
import { isDestroyable } from '@/Engine/Utils';

export function Space(params: TSpaceParams): TEntity<TSpace> {
  const { canvas, hooks, version, name, tags } = params;
  const built$: Subject<void> = new Subject<void>();

  const { services, loops } = initSpaceServices(params);

  hooks?.beforeResourcesLoaded?.(params, services, loops);
  await loadResourcesFromConfig(config.resources, services);
  services.rendererService.create({ canvas, mode: RendererModes.WebGL2, isActive: true });
  hooks?.beforeEntitiesCreatedFromConfig?.(params, services, loops);
  createEntitiesFromConfig(config.entities, services);
  hooks?.afterEntitiesCreatedFromConfig?.(params, services, loops);

  const entities: TSpaceEntities = {
    services,
    loops,
    ready: false,
    built$: built$.asObservable()
  };

  built$.subscribe((): void => {
    // eslint-disable-next-line functional/immutable-data
    (entities as TWriteable<TSpaceEntities>).ready = true;
    built$.next();
    built$.complete();
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

function initSpaceServices(params: TSpaceParams): { services: TSpaceServices; loops: TSpaceLoops } {
  const { canvas, hooks } = params;

  // TODO 13-0-0: remove?
  // hooks?.beforeConfigValidation?.(params);
  // validateConfig(config);
  screenService.setCanvas(canvas);
  hooks?.beforeBaseServicesBuilt?.(canvas, params);
  const baseServices: TSpaceBaseServices = buildBaseServices();
  const sceneW: TSceneWrapper = getActiveScene(params.name, params.scenes, baseServices.scenesService);
  hooks?.beforeLoopsCreated?.(params);
  const loops: TSpaceLoops = createLoops(baseServices.loopService);
  hooks?.beforeEntitiesServicesBuilt?.(canvas, params);
  const services: TSpaceServices = buildEntitiesServices(sceneW, canvas, loops, baseServices);

  return { services, loops };
}
