import type { TDelta } from '@/Engine/Loop';

import type { TGameKey } from './TGameKey';
import type { TKeyCombo } from './TKeyCombo';

export type TKeyboardPressingEvent = Readonly<{ key: TGameKey | TKeyCombo; delta: TDelta }>;
