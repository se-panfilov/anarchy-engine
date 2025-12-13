import type { Observable, Subject } from 'rxjs';

export type TAbstractLoopService<T> = Readonly<{
  tick$: Subject<T>;
}>;

export type TAbstractReadonlyLoopServiceWith<T> = Omit<TAbstractLoopService<T>, 'tick$'> &
  Readonly<{
    tick$: Observable<T>;
  }>;
