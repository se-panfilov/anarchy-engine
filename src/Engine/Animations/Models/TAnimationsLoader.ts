import type { TAbstractLoader } from '@/Engine/Abstract';

import type { TAnimations } from './TAnimations';
import type { TAnimationsResourceConfig } from './TAnimationsResourceConfig';

export type TAnimationsLoader = TAbstractLoader<TAnimations, TAnimationsResourceConfig>;
