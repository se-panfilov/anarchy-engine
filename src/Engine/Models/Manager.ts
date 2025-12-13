import type { Entity } from '@Engine/Models/index';
import { BehaviorSubject, Subject } from 'rxjs';

export interface Manager<T extends Entity> {
  readonly id: string;
  readonly create: (params?: any) => T;
  readonly setCurrent: (scene: T) => void;
  readonly current$: BehaviorSubject<T | undefined>;
  readonly list$: BehaviorSubject<ReadonlyArray<T>>;
  readonly destroy: () => void;
  readonly destroyed$: Subject<void>;
}
