import type { TDelta } from '@Anarchy/Engine/Loop';

import type { TGameKey } from './TGameKey';
import type { TKeyCombo } from './TKeyCombo';

export type TKeyboardPressingEvent = Readonly<{ key: TGameKey | TKeyCombo; delta: TDelta }>;
