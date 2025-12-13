import { Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { Manager } from '../Models/Manager';

export function LoopManager(): Manager {
  const destroyed$ = new Subject<void>();

  function start(): void {}

  function destroy() {
    destroyed$.next();
    destroyed$.complete();
  }

  return { id: `loop_manager_${nanoid()}`, start, destroy, destroyed$ };
}
