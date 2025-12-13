import type { TWithId, TWithName, TWithTags } from '@Anarchy/Engine/Mixins';
import type { TOptional } from '@Shared/Utils';

export type TEntityParams = TWithTags & TWithName & TOptional<TWithId>;
