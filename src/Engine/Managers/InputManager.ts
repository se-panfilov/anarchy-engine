import { BehaviorSubject, Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { Manager } from './Models/Manager';
import { MousePointerWrapper } from '@Engine/Pointer';
import type { WrappedMousePointer } from '@Engine/Pointer/lib/models/WrappedMousePointer';

export function InputManager(): Manager<WrappedInput> {
  const current$ = new BehaviorSubject<WrappedInput | undefined>(undefined);
  const list$ = new BehaviorSubject<ReadonlyArray<WrappedInput>>([]);
  const destroyed$ = new Subject<void>();

  function create(): WrappedInput {
    const wrapper = MousePointerWrapper();
    list$.next([...list$.value, wrapper]);
    return wrapper;
  }

  const setCurrent = (pointer: WrappedMousePointer): void => current$.next(pointer);

  function destroy() {
    current$.complete();
    list$.complete();
    destroyed$.next();
    destroyed$.complete();
  }

  return { id: `input_manager_${nanoid()}`, create, setCurrent, current$, list$, destroy, destroyed$ };
}
