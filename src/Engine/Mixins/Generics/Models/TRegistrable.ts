import type { TWithId, TWithNameOptional, TWithReadonlyTags } from '@/Engine/Mixins';

export type TRegistrable = TWithId & TWithNameOptional & TWithReadonlyTags;
