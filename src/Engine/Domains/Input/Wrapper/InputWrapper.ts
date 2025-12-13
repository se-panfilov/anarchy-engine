import type { IInputParams } from '@Engine/Models';
import { AbstractWrapper } from '@Engine/Wrappers';

import type { IInputWrapper, MOCK_INPUT_TYPE } from './Models';

export function InputWrapper(params: IInputParams): IInputWrapper {
  const entity: Readonly<MOCK_INPUT_TYPE> = {};
  return { ...AbstractWrapper(entity, params), entity };
}
