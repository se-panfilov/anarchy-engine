import type { TWithId, TWithName, TWithTags } from '@/Mixins';
import type { TOptional } from '@/Utils';

export type TEntityParams = TWithTags & TWithName & TOptional<TWithId>;
