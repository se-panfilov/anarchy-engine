import type { TWithId, TWithName, TWithTags } from '@Anarchy/Engine/Mixins';
import type { TOptional } from '@hellpig/anarchy-shared/Utils';

export type TEntityParams = TWithTags & TWithName & TOptional<TWithId>;
