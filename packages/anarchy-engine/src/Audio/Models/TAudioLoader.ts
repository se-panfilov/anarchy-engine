import type { TAbstractLoader } from '@Anarchy/Engine/Abstract';

import type { TAudioMetaInfoRegistry } from './TAudioMetaInfoRegistry';
import type { TAudioResourceAsyncRegistry } from './TAudioResourceAsyncRegistry';
import type { TAudioResourceConfig } from './TAudioResourceConfig';

export type TAudioLoader = TAbstractLoader<AudioBuffer, TAudioResourceConfig, TAudioResourceAsyncRegistry, TAudioMetaInfoRegistry>;
