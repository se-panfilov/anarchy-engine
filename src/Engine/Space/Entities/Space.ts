import type { Subscription } from 'rxjs';

import type { TAbstractService, TEntity } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TAppCanvas } from '@/Engine/App';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { RendererModes } from '@/Engine/Renderer';
import type { TSceneWrapper } from '@/Engine/Scene';
import { screenService } from '@/Engine/Services';
import { withBuiltMixin } from '@/Engine/Space/Mixins';
import type { TSpace, TSpaceBaseServices, TSpaceConfig, TSpaceHooks, TSpaceLoops, TSpaceParams, TSpaceService, TWithBuilt } from '@/Engine/Space/Models';
import { buildBaseServices, buildEntitiesServices, createEntities, getActiveScene, loadResources } from '@/Engine/Space/Utils';
import { createLoops } from '@/Engine/Space/Utils/CreateLoopsUtils';
import { validateConfig } from '@/Engine/Space/Validators';
import { isDestroyable } from '@/Engine/Utils';

export function Space(params: TSpaceParams): TEntity<TSpace> {
  const { canvas, hooks } = params;

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

  const destroyable: TDestroyable = destroyableMixin();
  const builtMixin: TWithBuilt = withBuiltMixin();

  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    builtMixin.built$.complete();
    builtMixin.built$.unsubscribe();
    Object.values(services).forEach((service): void => void (isDestroyable(service) && service.destroy$.next()));
  });

  builtMixin.build();

  return {
    name: config.name,
    services,
    loops,
    ...builtMixin,
    built$: builtMixin.built$.asObservable(),
    ...destroyable,
    tags: config.tags
  };
}
