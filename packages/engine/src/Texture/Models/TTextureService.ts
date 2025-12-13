import type { TSerializableResourceService } from '@/Abstract';
import type { TWithLoadResourcesAsyncService, TWithResourcesMetaInfoRegistryService, TWithResourcesRegistryService } from '@/Mixins';
import type { TTexture, TTextureResourceConfig } from '@/Texture';

import type { TTextureAsyncRegistry } from './TTextureAsyncRegistry';

export type TTextureService = TSerializableResourceService<TTextureResourceConfig> &
  TWithResourcesRegistryService<TTextureAsyncRegistry> &
  TWithResourcesMetaInfoRegistryService<TTextureResourceConfig> &
  TWithLoadResourcesAsyncService<TTextureResourceConfig, TTexture>;
