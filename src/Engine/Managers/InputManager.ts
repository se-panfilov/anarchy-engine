import { AbstractFactory } from '@Engine/Managers/AbstractFactory';
import { InputWrapper } from '@Engine/Wrappers/InputWrapper';

export class InputManager extends AbstractFactory<InputWrapper> {
  public create(): InputWrapper {
    const wrapper = new InputWrapper();
    this.list$.next([...this.list$.value, wrapper]);
    return wrapper;
  }
}
