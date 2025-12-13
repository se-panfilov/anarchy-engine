import type { Subscription } from 'rxjs';

import type { TAppCanvas } from '@/Engine/App';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { withTagsMixin } from '@/Engine/Mixins/Generics';
import { RendererModes } from '@/Engine/Renderer';
import { screenService } from '@/Engine/Services';
import { withBuiltMixin } from '@/Engine/Space/Mixins';
import type { TSpace, TSpaceConfig, TSpaceService, TWithBuilt } from '@/Engine/Space/Models';
import { createEntities, loadResources, prepareServices, watchResourcesAndCreateResourceEntities } from '@/Engine/Space/Utils';
import { validateConfig } from '@/Engine/Space/Validators';
import { isDestroyable } from '@/Engine/Utils';

// TODO SPACE: we need a space service, and factory, to create from config, and to create from the code.
export function SpaceService(): TSpaceService {
  // TODO LOGGER: add a logger globally (not only for errors, but I'd like to know, which service with which id did what).
  async function buildSpaceFromConfig(canvas: TAppCanvas, config: TSpaceConfig): Promise<TSpace> {
    validateConfig(config);
    screenService.setCanvas(canvas);
    const { services } = await prepareServices(config.name, canvas, config.scenes);

    const resourceEntitiesSubsList: ReadonlyArray<Subscription> = watchResourcesAndCreateResourceEntities(services);
    await loadResources(config.resources, services);
    services.rendererService.create({ canvas, tags: [], mode: RendererModes.WebGL2, isActive: true });
    createEntities(config.entities, services);

    const destroyable: TDestroyable = destroyableMixin();
    const builtMixin: TWithBuilt = withBuiltMixin();

    destroyable.destroyed$.subscribe(() => {
      builtMixin.built$.complete();
      resourceEntitiesSubsList.forEach((sub: Subscription): void => sub.unsubscribe());
      Object.values(services).forEach((service): void => void (isDestroyable(service) && service.destroy()));
    });

    builtMixin.build();

    return {
      name: config.name,
      services,
      ...builtMixin,
      built$: builtMixin.built$.asObservable(),
      ...destroyable,
      ...withTagsMixin(config.tags)
    };
  }

  return {
    buildSpaceFromConfig
  };
}

export const spaceService: TSpaceService = SpaceService();
