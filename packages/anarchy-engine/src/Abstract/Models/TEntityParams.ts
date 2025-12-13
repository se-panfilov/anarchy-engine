import type { TWithId, TWithName, TWithTags } from '@Anarchy/Engine/Mixins';
import type { TOptional } from '@Anarchy/Shared/Utils';

export type TEntityParams = TWithTags & TWithName & TOptional<TWithId>;
