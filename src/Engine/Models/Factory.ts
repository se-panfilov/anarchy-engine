import type { Subject } from 'rxjs';
import type { Entity } from '@Engine/Models/Entity';

export interface Factory<T extends Entity, R extends Record<string, any>> {
  readonly id: string;
  readonly create: (...params: any) => T;
  readonly latest$: Subject<T>;
  readonly add$: Subject<R>;
  // readonly list$: Subject<Map<string, T>>;
  readonly destroy: () => void;
  readonly destroyed$: Subject<void>;
}
