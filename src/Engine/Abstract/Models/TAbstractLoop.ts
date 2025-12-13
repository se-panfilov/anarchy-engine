import type { Subject } from 'rxjs';

// TODO 10.0.0. LOOPS: Check if this needed or required refactoring
export type TAbstractLoop<T> = Readonly<{
  tick$: Subject<T>;
}>;

// TODO 10.0.0. LOOPS: Check if this needed or required refactoring
export type TAbstractReadonlyLoopWith<T> = Omit<TAbstractLoop<T>, 'tick$'> &
  Readonly<{
    tick$: Subject<T>;
  }>;
