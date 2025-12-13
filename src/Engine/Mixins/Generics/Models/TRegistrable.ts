import type { TWithId, TWithNameOptional, TWithTags } from '@/Engine/Mixins';

export type TRegistrable = TWithId & TWithNameOptional & TWithTags;
