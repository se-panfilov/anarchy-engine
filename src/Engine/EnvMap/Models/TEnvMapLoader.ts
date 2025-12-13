import type { TAbstractLoader } from '@/Engine/Abstract';

import type { TEnvMapResourceConfig } from './TEnvMapResourceConfig';
import type { TEnvMapTexture } from './TEnvMapTexture';

export type TEnvMapLoader = TAbstractLoader<TEnvMapTexture, TEnvMapResourceConfig>;
