import type { TAbstractService } from '@/Abstract';
import { AbstractService } from '@/Abstract';
import type { TDisposable } from '@/Mixins';
import { withSerializeAllResources } from '@/Mixins';
import { TexturesLoader } from '@/Texture/Loaders';
import type { TTextureAsyncRegistry, TTextureMetaInfoRegistry, TTextureResourceConfig, TTextureSerializeResourcesDependencies, TTextureService, TTexturesLoader } from '@/Texture/Models';
import { mergeAll } from '@/Utils';

export function TextureService(resourcesRegistry: TTextureAsyncRegistry, metaInfoRegistry: TTextureMetaInfoRegistry): TTextureService {
  const texturesLoader: TTexturesLoader = TexturesLoader(resourcesRegistry, metaInfoRegistry);
  const disposable: ReadonlyArray<TDisposable> = [resourcesRegistry, texturesLoader];
  const abstractService: TAbstractService = AbstractService(disposable);

  return mergeAll(abstractService, withSerializeAllResources<TTextureResourceConfig, TTextureSerializeResourcesDependencies>(resourcesRegistry, { metaInfoRegistry }), {
    loadAsync: texturesLoader.loadAsync,
    loadFromConfigAsync: texturesLoader.loadFromConfigAsync,
    getResourceRegistry: (): TTextureAsyncRegistry => resourcesRegistry,
    getMetaInfoRegistry: (): TTextureMetaInfoRegistry => metaInfoRegistry
  });
}
