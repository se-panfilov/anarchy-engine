import type { TAbstractLoader } from '@Engine/Abstract';

import type { TAnimations } from './TAnimations';
import type { TAnimationsMetaInfoRegistry } from './TAnimationsMetaInfoRegistry';
import type { TAnimationsResourceAsyncRegistry } from './TAnimationsResourceAsyncRegistry';
import type { TAnimationsResourceConfig } from './TAnimationsResourceConfig';

export type TAnimationsLoader = TAbstractLoader<TAnimations, TAnimationsResourceConfig, TAnimationsResourceAsyncRegistry, TAnimationsMetaInfoRegistry>;
