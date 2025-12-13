import { AbstractWrapper } from '@Engine/Wrappers/AbstractWrapper';

export class InputWrapper extends AbstractWrapper<Input> {
  public entity: Input;

  constructor() {
    super();
    this.entity = new Input();
  }
}
