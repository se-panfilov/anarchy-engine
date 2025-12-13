import type { TSerializableResourceService } from '@Anarchy/Engine/Abstract';
import type { TWithLoadResourcesAsyncService, TWithResourcesMetaInfoRegistryService, TWithResourcesRegistryService } from '@Anarchy/Engine/Mixins';
import type { TTexture, TTextureResourceConfig } from '@Anarchy/Engine/Texture';

import type { TTextureAsyncRegistry } from './TTextureAsyncRegistry';

export type TTextureService = TSerializableResourceService<TTextureResourceConfig> &
  TWithResourcesRegistryService<TTextureAsyncRegistry> &
  TWithResourcesMetaInfoRegistryService<TTextureResourceConfig> &
  TWithLoadResourcesAsyncService<TTextureResourceConfig, TTexture>;
