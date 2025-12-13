import type { TSerializableResourceService } from '@/Engine/Abstract';
import type { TWithLoadResourcesAsyncService, TWithResourcesMetaInfoRegistryService, TWithResourcesRegistryService } from '@/Engine/Mixins';
import type { TTexture, TTextureResourceConfig } from '@/Engine/Texture';

import type { TTextureAsyncRegistry } from './TTextureAsyncRegistry';

export type TTextureService = TSerializableResourceService<TTextureResourceConfig> &
  TWithResourcesRegistryService<TTextureAsyncRegistry> &
  TWithResourcesMetaInfoRegistryService<TTextureResourceConfig> &
  TWithLoadResourcesAsyncService<TTextureResourceConfig, TTexture>;
