import type { BehaviorSubject } from 'rxjs';

export type TWithActiveAccessorsService<T> = Readonly<{
  setActive: (id: string) => void;
  findActive: () => T | undefined;
  active$: BehaviorSubject<T | undefined>;
}>;
