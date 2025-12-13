import { BehaviorSubject, Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { Manager } from './Models/Manager';
import { MousePointerWrapper } from '@Engine/Pointer';
import type { WrappedMousePointer } from '@Engine/Pointer/lib/models/WrappedMousePointer';

interface IInputManager extends Manager {
  readonly create: () => void;
  readonly setCurrent: (pointer: WrappedMousePointer) => void;
  readonly current$: BehaviorSubject<WrappedInput | undefined>;
  readonly list$: BehaviorSubject<ReadonlyArray<WrappedInput>>;
}

export function InputManager(): IInputManager {
  const current$ = new BehaviorSubject<WrappedInput | undefined>(undefined);
  const list$ = new BehaviorSubject<ReadonlyArray<WrappedInput>>([]);
  const destroyed$ = new Subject<void>();

  const create = (): void => list$.next([...list$.value, MousePointerWrapper()]);
  const setCurrent = (pointer: WrappedMousePointer): void => current$.next(pointer);

  function destroy() {
    current$.complete();
    list$.complete();
    destroyed$.next();
    destroyed$.complete();
  }

  return { id: `input_manager_${nanoid()}`, create, setCurrent, current$, list$, destroy, destroyed$ };
}
