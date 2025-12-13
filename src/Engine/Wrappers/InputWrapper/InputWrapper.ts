import type { IInputWrapper, MOCK_INPUT_TYPE } from './Models';
import { AbstractWrapper } from '@Engine/Wrappers';
import type { IInputParams } from '@Engine/Models';

export function InputWrapper(params: IInputParams): IInputWrapper {
  const entity: MOCK_INPUT_TYPE = {};
  return { ...AbstractWrapper(entity), entity };
}
