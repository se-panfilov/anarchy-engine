import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TDisposable } from '@/Engine/Mixins';
import { TexturesLoader } from '@/Engine/Texture/Loaders';
import type { TTextureAsyncRegistry, TTextureService, TTexturesLoader } from '@/Engine/Texture/Models';

export function TextureService(resourcesRegistry: TTextureAsyncRegistry): TTextureService {
  const disposable: ReadonlyArray<TDisposable> = [resourcesRegistry];
  const abstractService: TAbstractService = AbstractService(disposable);
  const texturesLoader: TTexturesLoader = TexturesLoader(resourcesRegistry);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    loadAsync: texturesLoader.loadAsync,
    loadFromConfigAsync: texturesLoader.loadFromConfigAsync,
    getResourceRegistry: (): TTextureAsyncRegistry => resourcesRegistry
  });
}
