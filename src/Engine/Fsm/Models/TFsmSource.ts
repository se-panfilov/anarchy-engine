import type { TWithId, TWithReadonlyTags } from '@/Engine/Mixins';

import type { TFsmParams } from './TFsmParams';

export type TFsmSource = TFsmParams & TWithId & TWithReadonlyTags;
