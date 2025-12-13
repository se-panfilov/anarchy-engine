import { AbstractManager } from '@Engine/Managers/AbstractManager';
import { InputWrapper } from '@Engine/Wrappers/InputWrapper';

export class InputManager extends AbstractManager<InputWrapper> {
  public create(): InputWrapper {
    const wrapper = new InputWrapper();
    this.list$.next([...this.list$.value, wrapper]);
    return wrapper;
  }
}
