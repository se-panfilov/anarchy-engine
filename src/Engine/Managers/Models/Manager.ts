import type { Entity } from '@Engine/Models';
import { BehaviorSubject } from 'rxjs';

export interface Manager<T extends Entity> extends Entity {
  readonly create: (params?: any) => T;
  readonly setCurrent: (scene: T) => void;
  readonly current$: BehaviorSubject<T | undefined>;
  readonly list$: BehaviorSubject<ReadonlyArray<T>>;
}
