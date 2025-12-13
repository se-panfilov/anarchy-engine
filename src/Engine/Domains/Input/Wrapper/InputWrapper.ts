import { AbstractWrapper, WrapperType } from '@Engine/Domains/Abstract';

import type { MOCK_INPUT_TYPE } from '../Constants';
import type { IInputParams, IInputWrapper } from '../Models';

export function InputWrapper(params: IInputParams): IInputWrapper {
  const entity: Readonly<MOCK_INPUT_TYPE> = {};
  return { ...AbstractWrapper(entity, WrapperType.Input, params), entity };
}
