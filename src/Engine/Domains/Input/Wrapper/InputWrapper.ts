import { AbstractWrapper } from '@Engine/Domains/Abstract';
import type { IInputParams, IInputWrapper, MOCK_INPUT_TYPE } from '@Engine/Domains/Input';

export function InputWrapper(params: IInputParams): IInputWrapper {
  const entity: Readonly<MOCK_INPUT_TYPE> = {};
  return { ...AbstractWrapper(entity, params), entity };
}
