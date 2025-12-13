import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TTextureAsyncRegistry, TTextureFactory, TTextureLoadedPack, TTexturePackConfig, TTexturePackParams, TTextureService } from '@/Engine/Texture/Models';

import { TextureServiceLoaderUtils } from './TextureServiceLoaderUtils';

export function TextureService(factory: TTextureFactory, registry: TTextureAsyncRegistry): TTextureService {
  const { loadList, load, loadMaterialPack } = TextureServiceLoaderUtils(registry);
  factory.entityCreated$.subscribe((pack: TTextureLoadedPack): void => registry.add(pack.url, pack.texture));

  const createAsync = (params: TTexturePackParams): Promise<TTextureLoadedPack> => factory.createAsync(params, { load });

  function createFromConfigAsync(textures: ReadonlyArray<TTexturePackConfig>): Promise<ReadonlyArray<TTextureLoadedPack>> {
    return Promise.all(textures.map((config: TTexturePackConfig): Promise<TTextureLoadedPack> => createAsync(factory.configToParams(config))));
  }

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    // TODO DESTROY: unload textures (maybe do it in registry?)
    registry.destroy();
  });

  return {
    createAsync,
    createFromConfigAsync,
    load,
    loadList,
    loadMaterialPack,
    getFactory: (): TTextureFactory => factory,
    getRegistry: (): TTextureAsyncRegistry => registry,
    ...destroyable
  };
}
