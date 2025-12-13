import type { TWithId, TWithNameOptional, TWithTags } from '@/Engine/Mixins';
import type { TOptional } from '@/Engine/Utils';

export type TEntityParams = TWithTags & TWithNameOptional & TOptional<TWithId>;
