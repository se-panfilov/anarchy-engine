import { BehaviorSubject, Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { Manager } from './Models/Manager';
import type { WrappedControl } from '@Engine/Control/Models/WrappedControl';
import { ControlWrapper } from '@Engine/Control/ControlWrapper';
import type { WrappedCamera } from '@Engine/Camera/Models/WrappedCamera';
import type { WrappedRenderer } from '@Engine/Renderer/Models/WrappedRenderer';

export function ControlManager(): Manager<WrappedControl> {
  const current$ = new BehaviorSubject<WrappedControl | undefined>(undefined);
  const list$ = new BehaviorSubject<ReadonlyArray<WrappedControl>>([]);
  const destroyed$ = new Subject<void>();

  function create(wrappedCamera: WrappedCamera, wrappedRenderer: WrappedRenderer): WrappedControl {
    const wrapper = ControlWrapper(wrappedCamera, wrappedRenderer);
    list$.next([...list$.value, wrapper]);
    return wrapper;
  }

  const setCurrent = (pointer: WrappedControl): void => current$.next(pointer);

  function destroy() {
    current$.complete();
    list$.complete();
    destroyed$.next();
    destroyed$.complete();
  }

  return { id: `control_manager_${nanoid()}`, create, setCurrent, current$, list$, destroy, destroyed$ };
}
