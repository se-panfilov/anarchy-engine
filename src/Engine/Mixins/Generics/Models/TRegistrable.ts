import type { TWithId, TWithNameOptional, TWithTagsMixin } from '@/Engine/Mixins';

export type TRegistrable = TWithId & TWithNameOptional & TWithTagsMixin;
