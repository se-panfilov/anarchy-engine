import type { TWithId } from './TWithId';
import type { TWithName } from './TWithName';
import type { TWithTags } from './TWithTags';

export type TRegistrable = TWithId & TWithName & TWithTags;
