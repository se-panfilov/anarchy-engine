import type { TWithId, TWithTags } from '@/Engine/Mixins';

import type { TFsmParams } from './TFsmParams';

export type TFsmSource = TFsmParams & TWithId & TWithTags;
