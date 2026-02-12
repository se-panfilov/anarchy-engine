import type { TAbstractLoader } from '@Anarchy/Engine/Abstract';

import type { TEnvMapMetaInfoRegistry } from './TEnvMapMetaInfoRegistry';
import type { TEnvMapResourceConfig } from './TEnvMapResourceConfig';
import type { TEnvMapTexture } from './TEnvMapTexture';
import type { TEnvMapTextureAsyncRegistry } from './TEnvMapTextureAsyncRegistry';

export type TEnvMapLoader = TAbstractLoader<TEnvMapTexture, TEnvMapResourceConfig, TEnvMapTextureAsyncRegistry, TEnvMapMetaInfoRegistry>;
