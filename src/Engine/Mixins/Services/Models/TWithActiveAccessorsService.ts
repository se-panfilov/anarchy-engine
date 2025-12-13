import type { BehaviorSubject } from 'rxjs';

export type TWithActiveAccessorsService<T> = Readonly<{
  setActive: (id: string) => void;
  findActive: () => T | undefined;
  getActive: () => T | never;
  active$: BehaviorSubject<T | undefined>;
}>;
