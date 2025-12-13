import type { TWithId, TWithName, TWithTags } from '@/Mixins';

export type TRegistrable = TWithId & TWithName & TWithTags;
