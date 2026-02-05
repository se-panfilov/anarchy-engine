import type { TAbstractService } from '@hellpig/anarchy-engine/Abstract';
import { AbstractService } from '@hellpig/anarchy-engine/Abstract';
import type { TLoadingManagerWrapper } from '@hellpig/anarchy-engine/LoadingManager';
import type { TDisposable } from '@hellpig/anarchy-engine/Mixins';
import { withSerializeAllResources } from '@hellpig/anarchy-engine/Mixins';
import { TexturesLoader } from '@hellpig/anarchy-engine/Texture/Loaders';
import type {
  TTextureAsyncRegistry,
  TTextureMetaInfoRegistry,
  TTextureResourceConfig,
  TTextureSerializeResourcesDependencies,
  TTextureService,
  TTexturesLoader
} from '@hellpig/anarchy-engine/Texture/Models';
import { mergeAll } from '@hellpig/anarchy-engine/Utils';

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
