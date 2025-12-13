import { SceneWrapper } from '@Engine/Wrappers/SceneWrapper';
import { AbstractFactory } from '@Engine/Managers/AbstractFactory';

export class SceneManager extends AbstractFactory<SceneWrapper> {
  public create(name: string): SceneWrapper {
    const wrapper = new SceneWrapper(name);
    this.list$.next([...this.list$.value, wrapper]);
    return wrapper;
  }
}
