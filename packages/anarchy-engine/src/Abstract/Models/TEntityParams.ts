import type { TWithId, TWithName, TWithTags } from '@hellpig/anarchy-engine/Mixins';
import type { TOptional } from '@hellpig/anarchy-shared/Utils';

export type TEntityParams = TWithTags & TWithName & TOptional<TWithId>;
