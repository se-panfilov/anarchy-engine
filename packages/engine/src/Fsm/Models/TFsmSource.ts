import type { TSerializable, TWithId, TWithTags } from '@/Mixins';

import type { TFsmParams } from './TFsmParams';

export type TFsmSource = TFsmParams & TWithId & TWithTags & TSerializable<any>;
