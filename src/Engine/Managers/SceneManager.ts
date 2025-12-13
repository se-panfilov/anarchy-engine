import { BehaviorSubject, Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { Manager } from '@Engine/Managers/Models/Manager';
import type { WrappedScene } from '@Engine/Scene/Models/WrappedScene';
import { SceneWrapper } from '@Engine/Scene/SceneWrapper';

export function SceneManager(): Manager<WrappedScene> {
  const current$ = new BehaviorSubject<WrappedScene | undefined>(undefined);
  const list$ = new BehaviorSubject<ReadonlyArray<WrappedScene>>([]);
  const destroyed$ = new Subject<void>();

  function create(): WrappedScene {
    const wrapper = SceneWrapper();
    list$.next([...list$.value, wrapper]);
    return wrapper;
  }

  const setCurrent = (camera: WrappedScene): void => current$.next(camera);

  function destroy() {
    current$.complete();
    list$.complete();
    destroyed$.next();
    destroyed$.complete();
  }

  return { id: `scene_manager_${nanoid()}`, create, setCurrent, current$, list$, destroy, destroyed$ };
}
