import type { Subscription } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import { TexturesLoader } from '@/Engine/Texture/Loaders';
import type { TTextureAsyncRegistry, TTextureService, TTexturesLoader } from '@/Engine/Texture/Models';

export function TextureService(resourcesRegistry: TTextureAsyncRegistry): TTextureService {
  const abstractService: TAbstractService = AbstractService();
  const texturesLoader: TTexturesLoader = TexturesLoader(resourcesRegistry);

  const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    // TODO DESTROY: We need a way to unload env maps, tho
    resourcesRegistry.destroy$.next();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    loadAsync: texturesLoader.loadAsync,
    loadFromConfigAsync: texturesLoader.loadFromConfigAsync,
    getResourceRegistry: (): TTextureAsyncRegistry => resourcesRegistry
  });
}
