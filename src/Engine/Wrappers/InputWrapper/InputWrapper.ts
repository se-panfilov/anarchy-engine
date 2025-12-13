import type { IInputParams } from '@Engine/Models';
import { AbstractWrapper } from '@Engine/Wrappers';

import type { IInputWrapper, MOCK_INPUT_TYPE } from './Models';

// TODO (S.Panfilov) params is not needed here, remove
export function InputWrapper(params: IInputParams): IInputWrapper {
  console.log(params);
  const entity: Readonly<MOCK_INPUT_TYPE> = {};
  return { ...AbstractWrapper(entity), entity };
}
