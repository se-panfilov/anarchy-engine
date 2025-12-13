import type { Subject } from 'rxjs';

export type TAbstractLoop<T> = Readonly<{
  tick$: Subject<T>;
}>;
