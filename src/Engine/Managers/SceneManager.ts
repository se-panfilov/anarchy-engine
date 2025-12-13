import { BehaviorSubject, Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { Manager } from '@Engine/Managers/Models/Manager';

interface ISceneManager extends Manager {
  readonly create: (params: SceneParams) => void;
  readonly setCurrent: (scene: WrappedScene) => void;
  readonly current$: BehaviorSubject<WrappedScene | undefined>;
  readonly list$: BehaviorSubject<ReadonlyArray<WrappedScene>>;
  readonly start: () => void;
}

export function SceneManager(): ISceneManager {
  const current$ = new BehaviorSubject<WrappedScene | undefined>(undefined);
  const list$ = new BehaviorSubject<ReadonlyArray<WrappedScene>>([]);
  const destroyed$ = new Subject<void>();

  const create = (params: SceneParams): void => list$.next([...list$.value, SceneWrapper(params)]);
  const setCurrent = (camera: WrappedScene): void => current$.next(camera);

  function start(): void {
    // TODO (S.Panfilov)
  }

  function destroy() {
    current$.complete();
    list$.complete();
    destroyed$.next();
    destroyed$.complete();
  }

  return { id: `scene_manager_${nanoid()}`, create, setCurrent, current$, list$, destroy, destroyed$ };
}
