import type { TAbstractService } from '@/Engine/Abstract';
import type { TWithLoadResourcesAsyncService, TWithResourcesRegistryService } from '@/Engine/Space';
import type { TTexture, TTextureResourceConfig } from '@/Engine/Texture';

import type { TTextureAsyncRegistry } from './TTextureAsyncRegistry';

export type TTextureService = TAbstractService & TWithResourcesRegistryService<TTextureAsyncRegistry> & TWithLoadResourcesAsyncService<TTextureResourceConfig, TTexture>;
