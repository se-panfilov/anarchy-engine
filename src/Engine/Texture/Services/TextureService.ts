import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { TexturesLoader } from '@/Engine/Texture/Loaders';
import type { TTextureAsyncRegistry, TTextureService, TTexturesLoader } from '@/Engine/Texture/Models';

export function TextureService(resourcesRegistry: TTextureAsyncRegistry): TTextureService {
  const texturesLoader: TTexturesLoader = TexturesLoader(resourcesRegistry);

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroy$.subscribe((): void => {
    // TODO DESTROY: We need a way to unload env maps, tho
    resourcesRegistry.destroy$.next();
  });

  return {
    loadAsync: texturesLoader.loadAsync,
    loadFromConfigAsync: texturesLoader.loadFromConfigAsync,
    getResourceRegistry: (): TTextureAsyncRegistry => resourcesRegistry,
    ...destroyable
  };
}
