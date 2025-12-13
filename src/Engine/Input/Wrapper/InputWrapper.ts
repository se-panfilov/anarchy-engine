import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { MOCK_INPUT_TYPE } from '@/Engine/Input/Constants';
import type { IInputParams, IInputWrapper } from '@/Engine/Input/Models';

export function InputWrapper(params: IInputParams): IInputWrapper {
  const entity: Readonly<MOCK_INPUT_TYPE> = {};
  return { ...AbstractWrapper(entity, WrapperType.Input, params), entity };
}
