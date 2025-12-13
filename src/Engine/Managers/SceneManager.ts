import { SceneWrapper } from '@Engine/Wrappers/SceneWrapper';
import { AbstractManager } from '@Engine/Managers/AbstractManager';

export class SceneManager extends AbstractManager<SceneWrapper> {
  public create(name: string): SceneWrapper {
    const wrapper = new SceneWrapper(name);
    this.list$.next([...this.list$.value, wrapper]);
    return wrapper;
  }
}
