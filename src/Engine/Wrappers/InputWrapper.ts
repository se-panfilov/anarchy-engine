import { AbstractWrapper } from '@Engine/Wrappers';
import type { InputParams } from '@Engine/Models';

type IInputWrapper = ReturnType<typeof AbstractWrapper<MOCK_INPUT_TYPE>>;

type MOCK_INPUT_TYPE = unknown;

export function InputWrapper(params: InputParams): IInputWrapper {
  const entity: MOCK_INPUT_TYPE = {};
  return { ...AbstractWrapper(entity), entity };
}
