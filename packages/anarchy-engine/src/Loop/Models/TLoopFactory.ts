import type { TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';

import type { TLoop } from './TLoop';
import type { TLoopParams } from './TLoopParams';

export type TLoopFactory = TReactiveFactory<TLoop, TLoopParams>;
