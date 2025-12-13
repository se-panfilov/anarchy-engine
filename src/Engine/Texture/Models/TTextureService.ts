import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithLoadResourcesAsyncService, TWithResourcesRegistryService } from '@/Engine/Space';
import type { TTexture, TTextureResourceConfig } from '@/Engine/Texture';

import type { TTextureAsyncRegistry } from './TTextureAsyncRegistry';

export type TTextureService = TWithResourcesRegistryService<TTextureAsyncRegistry> & TWithLoadResourcesAsyncService<TTextureResourceConfig, TTexture> & TDestroyable;
