import type { TDelta } from '@Anarchy/Engine/Loop';

import type { TGameKey } from './TGameKey';

export type TKeysPressingEvent = Readonly<{ keys: ReadonlySet<TGameKey>; delta: TDelta }>;
