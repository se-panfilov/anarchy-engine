import type { TAbstractService } from '@Anarchy/Engine/Abstract';
import { AbstractService } from '@Anarchy/Engine/Abstract';
import type { TLoadingManagerWrapper } from '@Anarchy/Engine/LoadingManager';
import type { TDisposable } from '@Anarchy/Engine/Mixins';
import { withSerializeAllResources } from '@Anarchy/Engine/Mixins';
import { TexturesLoader } from '@Anarchy/Engine/Texture/Loaders';
import type { TTextureAsyncRegistry, TTextureMetaInfoRegistry, TTextureResourceConfig, TTextureSerializeResourcesDependencies, TTextureService, TTexturesLoader } from '@Anarchy/Engine/Texture/Models';
import { mergeAll } from '@Anarchy/Engine/Utils';

export function TextureService(resourcesRegistry: TTextureAsyncRegistry, metaInfoRegistry: TTextureMetaInfoRegistry, loadingManagerWrapper: TLoadingManagerWrapper): TTextureService {
  const texturesLoader: TTexturesLoader = TexturesLoader(resourcesRegistry, metaInfoRegistry, loadingManagerWrapper);
  const disposable: ReadonlyArray<TDisposable> = [resourcesRegistry, texturesLoader];
  const abstractService: TAbstractService = AbstractService(disposable);

  return mergeAll(abstractService, withSerializeAllResources<TTextureResourceConfig, TTextureSerializeResourcesDependencies>(resourcesRegistry, { metaInfoRegistry }), {
    loadAsync: texturesLoader.loadAsync,
    loadFromConfigAsync: texturesLoader.loadFromConfigAsync,
    getResourceRegistry: (): TTextureAsyncRegistry => resourcesRegistry,
    getMetaInfoRegistry: (): TTextureMetaInfoRegistry => metaInfoRegistry
  });
}
