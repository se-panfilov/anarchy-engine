import { Text } from 'troika-three-text';

import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';
import type { ITextAccessors, ITextParams, ITextWrapper } from '@/Engine/Domains/Text/Models';
import { getAccessors } from '@/Engine/Domains/Text/Wrapper/Accessors';
import { applyParams } from '@/Engine/Domains/Text/Wrapper/WrapperUtils';

export function TextWrapper(params: ITextParams): ITextWrapper {
  const entity: Text = new Text();
  const withAccessors: ITextAccessors = getAccessors(entity);
  applyParams(params, withAccessors);

  const res =  {
    ...AbstractWrapper(entity, WrapperType.Text, params),
    ...withAccessors
  };

  console.log('TextWrapper', res);

  return res;
}
