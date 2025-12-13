import type { TWithId, TWithName, TWithTags } from '@/Engine/Mixins';
import type { TOptional } from '@/Engine/Utils';

export type TEntityParams = TWithTags & TWithName & TOptional<TWithId>;
