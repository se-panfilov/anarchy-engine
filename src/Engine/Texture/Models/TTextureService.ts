import type { TSerializableResourceService } from '@/Engine/Abstract';
import type { TWithLoadResourcesAsyncService, TWithResourcesRegistryService } from '@/Engine/Mixins';
import type { TTexture, TTextureResourceConfig } from '@/Engine/Texture';

import type { TTextureAsyncRegistry } from './TTextureAsyncRegistry';

export type TTextureService = TSerializableResourceService<TTextureResourceConfig> &
  TWithResourcesRegistryService<TTextureAsyncRegistry> &
  TWithLoadResourcesAsyncService<TTextureResourceConfig, TTexture>;
