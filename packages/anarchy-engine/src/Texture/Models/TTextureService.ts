import type { TSerializableResourceService } from '@hellpig/anarchy-engine/Abstract';
import type { TWithLoadResourcesAsyncService, TWithResourcesMetaInfoRegistryService, TWithResourcesRegistryService } from '@hellpig/anarchy-engine/Mixins';

import type { TTexture } from './TTexture';
import type { TTextureAsyncRegistry } from './TTextureAsyncRegistry';
import type { TTextureResourceConfig } from './TTextureResourceConfig';

export type TTextureService = TSerializableResourceService<TTextureResourceConfig> &
  TWithResourcesRegistryService<TTextureAsyncRegistry> &
  TWithResourcesMetaInfoRegistryService<TTextureResourceConfig> &
  TWithLoadResourcesAsyncService<TTextureResourceConfig, TTexture>;
