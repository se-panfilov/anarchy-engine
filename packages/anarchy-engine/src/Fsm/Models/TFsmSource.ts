import type { TSerializable, TWithId, TWithTags } from '@Anarchy/Engine/Mixins';

import type { TFsmParams } from './TFsmParams';

export type TFsmSource = TFsmParams & TWithId & TWithTags & TSerializable<any>;
