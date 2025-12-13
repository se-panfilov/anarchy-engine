import type { TAbstractService } from '@Engine/Abstract';
import { AbstractService } from '@Engine/Abstract';
import type { TDisposable } from '@Engine/Mixins';
import { withSerializeAllResources } from '@Engine/Mixins';
import { TexturesLoader } from '@Engine/Texture/Loaders';
import type { TTextureAsyncRegistry, TTextureMetaInfoRegistry, TTextureResourceConfig, TTextureSerializeResourcesDependencies, TTextureService, TTexturesLoader } from '@Engine/Texture/Models';
import { mergeAll } from '@Engine/Utils';

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
