import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { TexturesLoader } from '@/Engine/Texture/Loaders';
import type { TTextureAsyncRegistry, TTextureService, TTexturesLoader } from '@/Engine/Texture/Models';

export function TextureService(resourcesRegistry: TTextureAsyncRegistry): TTextureService {
  const texturesLoader: TTexturesLoader = TexturesLoader(resourcesRegistry);

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    // TODO DESTROY: We need a way to unload env maps, tho
    resourcesRegistry.destroy();
  });

  return {
    loadAsync: texturesLoader.loadAsync,
    loadFromConfigAsync: texturesLoader.loadFromConfigAsync,
    // TODO 9.0.0. RESOURCES: are we gonna use somewhere "loadMaterialPack" and "loadList"?
    // loadList,
    // loadMaterialPack,
    getResourceRegistry: (): TTextureAsyncRegistry => resourcesRegistry,
    ...destroyable
  };
}
