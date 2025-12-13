import type { Subscription } from 'rxjs';

import type { TAppCanvas } from '@/Engine/App';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { RendererModes } from '@/Engine/Renderer';
import { screenService } from '@/Engine/Services';
import { withBuiltMixin } from '@/Engine/Space/Mixins';
import type { TSpace, TSpaceConfig, TSpaceHooks, TSpaceService, TWithBuilt } from '@/Engine/Space/Models';
import { createEntities, loadResources, prepareServices } from '@/Engine/Space/Utils';
import { validateConfig } from '@/Engine/Space/Validators';
import { isDestroyable } from '@/Engine/Utils';

// TODO SPACE: we need a space service, and factory, to create from config, and to create from the code.
export function SpaceService(): TSpaceService {
  // TODO LOGGER: add a logger globally (not only for errors, but I'd like to know, which service with which id did what).
  async function buildSpaceFromConfig(canvas: TAppCanvas, config: TSpaceConfig, hooks?: TSpaceHooks): Promise<TSpace> {
    hooks?.beforeConfigValidation?.(config);
    validateConfig(config);
    hooks?.afterConfigValidation?.(config);
    screenService.setCanvas(canvas);
    hooks?.beforeServicesPrepared?.(canvas, config);
    const { services } = await prepareServices(config.name, canvas, config.scenes);
    hooks?.afterServicesPrepared?.(canvas, config, services);

    hooks?.beforeResourcesLoaded?.(config, services);
    await loadResources(config.resources, services);
    hooks?.afterResourcesLoaded?.(config, services);
    services.rendererService.create({ canvas, mode: RendererModes.WebGL2, isActive: true });
    hooks?.beforeEntitiesCreated?.(config, services);
    createEntities(config.entities, services);
    hooks?.afterEntitiesCreated?.(config, services);

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
      ...builtMixin,
      built$: builtMixin.built$.asObservable(),
      ...destroyable,
      tags: config.tags
    };
  }

  return {
    buildSpaceFromConfig
  };
}

export const spaceService: TSpaceService = SpaceService();
