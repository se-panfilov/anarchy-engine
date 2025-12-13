import { Text } from 'troika-three-text';

import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';
import type { ITextParams, ITextWrapper } from '@/Engine/Domains/Text/Models';
import { getAccessors } from '@/Engine/Domains/Text/Wrapper/Accessors';
import { applyParams } from '@/Engine/Domains/Text/Wrapper/TextWrapperHelper';
import { moveableMixin, rotatableMixin, scalableMixin, withObject3d } from '@/Engine/Mixins';

export function TextWrapper(params: ITextParams): ITextWrapper {
  const entity: Text = new Text();

  const result = {
    ...AbstractWrapper(entity, WrapperType.Text, params),
    ...getAccessors(entity),
    ...moveableMixin(entity),
    ...rotatableMixin(entity),
    ...scalableMixin(entity),
    ...withObject3d(entity)
  };

  applyParams(params, result);

  return result;
}
