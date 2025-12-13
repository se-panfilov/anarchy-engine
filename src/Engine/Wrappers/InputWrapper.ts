import { AbstractWrapper } from '@Engine/Wrappers/AbstractWrapper';

// export class InputWrapper extends AbstractWrapper<Input> {
export class InputWrapper extends AbstractWrapper<any> {
  // public entity: Input;
  public entity: any;

  constructor() {
    super();
    // this.entity = new Input();
  }
}
