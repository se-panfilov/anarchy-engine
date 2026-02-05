import type { TSerializable, TWithId, TWithTags } from '@hellpig/anarchy-engine/Mixins';

import type { TFsmParams } from './TFsmParams';

export type TFsmSource = TFsmParams & TWithId & TWithTags & TSerializable<any>;
