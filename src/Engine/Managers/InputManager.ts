import { BehaviorSubject, Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { Manager } from './Models/Manager';
import { MousePointerWrapper } from '@Engine/Pointer';
import type { WrappedMousePointer } from '@Engine/Pointer/lib/models/WrappedMousePointer';

interface IInputManager extends Manager {
  readonly initMousePointer: () => WrappedMousePointer;
}

export function InputManager(): IInputManager {
  const destroyed$ = new Subject<void>();
  const inputs$ = new BehaviorSubject<WrappedInput | undefined>(undefined);

  function initMousePointer(): WrappedMousePointer {
    const pointer = MousePointerWrapper();
    inputs$.next(pointer);
    return pointer;
  }

  function destroy() {
    inputs$.complete();
    destroyed$.next();
    destroyed$.complete();
  }

  return { id: `input_manager_${nanoid()}`, initMousePointer, inputs$, destroy, destroyed$ };
}
