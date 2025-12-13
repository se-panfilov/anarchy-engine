import type { Entity } from '@Engine/Models';
import { nanoid } from 'nanoid';
import { Subject } from 'rxjs';

// TODO (S.Panfilov) any
export function ActorRegistry<T extends Entity<unknown>>(): any {}
