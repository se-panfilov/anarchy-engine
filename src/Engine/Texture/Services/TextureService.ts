import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { TexturesLoader } from '@/Engine/Texture/Loaders';
import type { TTextureAsyncRegistry, TTextureFactory, TTextureLoadedPack, TTexturePackParams, TTextureResourceConfig, TTextureService, TTexturesLoader } from '@/Engine/Texture/Models';

export function TextureService(factory: TTextureFactory, registry: TTextureAsyncRegistry): TTextureService {
  const texturesLoader: TTexturesLoader = TexturesLoader(registry);
  factory.entityCreated$.subscribe((pack: TTextureLoadedPack): void => registry.add(pack.url, pack.texture));

  const createAsync = (params: TTexturePackParams): Promise<TTextureLoadedPack> => factory.createAsync(params, { load });

  function createFromConfigAsync(textures: ReadonlyArray<TTextureResourceConfig>): Promise<ReadonlyArray<TTextureLoadedPack>> {
    return Promise.all(textures.map((config: TTextureResourceConfig): Promise<TTextureLoadedPack> => createAsync(factory.configToParams(config))));
  }

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    // TODO DESTROY: unload textures (maybe do it in registry?)
    registry.destroy();
  });

  return {
    create,
    createFromConfig,
    loadAsync: texturesLoader.loadAsync,
    loadFromConfigAsync: texturesLoader.loadFromConfigAsync,
    // TODO 9.0.0. RESOURCES: are we gonna use somewhere "loadMaterialPack" and "loadList"?
    // loadList,
    // loadMaterialPack,
    getFactory: (): TTextureFactory => factory,
    getRegistry: (): TTextureAsyncRegistry => registry,
    ...destroyable
  };
}
