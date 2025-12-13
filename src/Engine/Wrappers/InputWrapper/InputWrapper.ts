import type { IInputWrapper, MOCK_INPUT_TYPE } from './Models';
import { AbstractWrapper } from '@Engine/Wrappers';
import type { InputParams } from '@Engine/Models';

export function InputWrapper(params: InputParams): IInputWrapper {
  const entity: MOCK_INPUT_TYPE = {};
  return { ...AbstractWrapper(entity), entity };
}
