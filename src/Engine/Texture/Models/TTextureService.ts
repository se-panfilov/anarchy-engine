import type { TEntitiesService } from '@/Engine/Abstract';
import type { TWithLoadResourcesAsyncService, TWithResourcesRegistryService } from '@/Engine/Mixins';
import type { TTexture, TTextureResourceConfig } from '@/Engine/Texture';

import type { TTextureAsyncRegistry } from './TTextureAsyncRegistry';

export type TTextureService = TEntitiesService & TWithResourcesRegistryService<TTextureAsyncRegistry> & TWithLoadResourcesAsyncService<TTextureResourceConfig, TTexture>;
