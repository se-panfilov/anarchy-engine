import { Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { Entity } from '@Engine/Models';

interface ISceneManager extends Entity {
  readonly start: () => void;
  readonly createScene: () => WrappedScene;
}

export function SceneManager(): ISceneManager {
  const destroyed$ = new Subject<void>();

  function start(): void {
    // TODO (S.Panfilov)
  }

  function createScene(): WrappedScene {
    // TODO (S.Panfilov)
  }

  function destroy() {
    destroyed$.next();
    destroyed$.complete();
  }

  return { id: `scene_manager_${nanoid()}`, start, createScene, destroy, destroyed$ };
}
