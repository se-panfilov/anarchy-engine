import { Text } from 'troika-three-text';

import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';
import type { ITextParams, ITextWrapper } from '@/Engine/Domains/Text/Models';
import { getAccessors } from '@/Engine/Domains/Text/Wrapper/Accessors';
import { applyTextParams } from '@/Engine/Domains/Text/Wrapper/TextWrapperHelper';
import { moveableMixin, rotatableMixin, scalableMixin, withObject3d } from '@/Engine/Mixins';
import { applyObject3dParams, applyPosition, applyRotation, applyScale, isDefined } from '@/Engine/Utils';

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

  applyTextParams(params, result);
  applyObject3dParams(params, result);
  applyPosition(params.position, result);
  applyRotation(params.rotation, result);
  if (isDefined(params.scale)) applyScale(params.scale, result);
  result.update();

  return result;
}
