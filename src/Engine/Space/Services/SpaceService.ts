import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TAppCanvas } from '@/Engine/App';
import { RendererModes } from '@/Engine/Renderer';
import type { TSceneWrapper } from '@/Engine/Scene';
import { screenService } from '@/Engine/Services';
import { withBuiltMixin } from '@/Engine/Space/Mixins';
import type { TSpace, TSpaceBaseServices, TSpaceConfig, TSpaceHooks, TSpaceLoops, TSpaceService, TWithBuilt } from '@/Engine/Space/Models';
import { buildBaseServices, buildEntitiesServices, createEntities, getActiveScene, loadResources } from '@/Engine/Space/Utils';
import { createLoops } from '@/Engine/Space/Utils/CreateLoopsUtils';
import { validateConfig } from '@/Engine/Space/Validators';
import { isDestroyable } from '@/Engine/Utils';

// TODO SPACE: we need a space service, and factory, to create from config, and to create from the code.
export function SpaceService(): TSpaceService {
  const abstractService: TAbstractService = AbstractService();
  // TODO LOGGER: add a logger globally (not only for errors, but I'd like to know, which service with which id did what).
  async function buildSpaceFromConfig(canvas: TAppCanvas, config: TSpaceConfig, hooks?: TSpaceHooks): Promise<TSpace> {
    hooks?.beforeConfigValidation?.(config);
    validateConfig(config);
    screenService.setCanvas(canvas);
    hooks?.beforeBaseServicesBuilt?.(canvas, config);
    const baseServices: TSpaceBaseServices = buildBaseServices();
    const sceneW: TSceneWrapper = getActiveScene(config.name, config.scenes, baseServices.scenesService);
    hooks?.beforeLoopsCreated?.(config);
    const loops: TSpaceLoops = createLoops(baseServices.loopService);
    hooks?.beforeEntitiesServicesBuilt?.(canvas, config);
    const services = buildEntitiesServices(sceneW, canvas, loops, baseServices);

    hooks?.beforeResourcesLoaded?.(config, services, loops);
    await loadResources(config.resources, services);
    services.rendererService.create({ canvas, mode: RendererModes.WebGL2, isActive: true });
    hooks?.beforeEntitiesCreated?.(config, services, loops);
    createEntities(config.entities, services);
    hooks?.afterEntitiesCreated?.(config, services, loops);

    const builtMixin: TWithBuilt = withBuiltMixin();

    const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
      destroySub$.unsubscribe();

      builtMixin.built$.complete();
      builtMixin.built$.unsubscribe();
      Object.values(services).forEach((service): void => void (isDestroyable(service) && service.destroy$.next()));
    });

    builtMixin.build();

    // eslint-disable-next-line functional/immutable-data
    return Object.assign(abstractService, {
      name: config.name,
      services,
      loops,
      ...builtMixin,
      built$: builtMixin.built$.asObservable(),
      tags: config.tags
    });
  }

  return {
    buildSpaceFromConfig
  };
}

export const spaceService: TSpaceService = SpaceService();
