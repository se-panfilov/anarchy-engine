import type { Observable } from 'rxjs';

export type TAbstractLoopService<T> = Readonly<{
  tick$: Observable<T>;
}>;
