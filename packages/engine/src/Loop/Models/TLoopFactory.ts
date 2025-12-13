import type { TReactiveFactory } from '@/Engine/Abstract';

import type { TLoop } from './TLoop';
import type { TLoopParams } from './TLoopParams';

export type TLoopFactory = TReactiveFactory<TLoop, TLoopParams>;
