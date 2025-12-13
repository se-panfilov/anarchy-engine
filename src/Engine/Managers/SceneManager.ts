import { BehaviorSubject, Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { Manager } from '@Engine/Managers/Models/Manager';

interface ISceneManager extends Manager {
  readonly start: () => void;
  readonly createScene: () => WrappedScene;
  readonly scenes$: () => BehaviorSubject<WrappedScene>;
  readonly setCurrentScene: (scene: WrappedScene) => void;
  readonly currentScene: WrappedScene;
}

export function SceneManager(): ISceneManager {
  const scenes$ = new BehaviorSubject<WrappedScene | undefined>(undefined);
  const destroyed$ = new Subject<void>();

  function start(): void {
    // TODO (S.Panfilov)
  }

  function setCurrentScene(scene: WrappedScene): void {
    // TODO (S.Panfilov)
  }

  function createScene(): WrappedScene {
    // TODO (S.Panfilov)
  }

  function destroy() {
    destroyed$.next();
    destroyed$.complete();
  }

  return {
    id: `scene_manager_${nanoid()}`,
    start,
    scenes$,
    createScene,
    setCurrentScene,
    currentScene,
    destroy,
    destroyed$
  };
}
