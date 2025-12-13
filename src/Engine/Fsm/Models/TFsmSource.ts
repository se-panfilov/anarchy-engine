import type { TWithId, TWithTagsMixin } from '@/Engine/Mixins';

import type { TFsmParams } from './TFsmParams';

export type TFsmSource = TFsmParams & TWithId & TWithTagsMixin;
