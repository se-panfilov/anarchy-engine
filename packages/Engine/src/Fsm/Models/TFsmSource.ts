import type { TSerializable, TWithId, TWithTags } from '@/Engine/Mixins';

import type { TFsmParams } from './TFsmParams';

export type TFsmSource = TFsmParams & TWithId & TWithTags & TSerializable<any>;
