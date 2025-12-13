import { SceneWrapper } from '@Engine/Wrappers/SceneWrapper';
import { AbstractManager } from '@Engine/Managers/AbstractManager';

export class SceneManager extends AbstractManager<SceneWrapper> {
  public create(): SceneWrapper {
    const wrapper = new SceneWrapper();
    this.list$.next([...this.list$.value, wrapper]);
    return wrapper;
  }
}
