import { Text } from 'troika-three-text';

import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';
import type { ITextParams, ITextWrapper } from '@/Engine/Domains/Text/Models';
import { getAccessors } from '@/Engine/Domains/Text/Wrapper/Accessors';
import { applyTextParams } from '@/Engine/Domains/Text/Wrapper/TextWrapperHelper';
import { scalableMixin, withMoveByXyzMixin, withObject3d, withRotationByXyzMixin } from '@/Engine/Mixins';
import { applyObject3dParams, applyPosition, applyRotation, applyScale, isDefined } from '@/Engine/Utils';

export function TextWrapper(params: ITextParams): ITextWrapper {
  const entity: Text = new Text();

  const result = {
    ...AbstractWrapper(entity, WrapperType.Text, params),
    ...getAccessors(entity),
    ...withMoveByXyzMixin(entity),
    ...withRotationByXyzMixin(entity),
    ...scalableMixin(entity),
    ...withObject3d(entity)
  };

  applyTextParams(result, params);
  applyObject3dParams(result, params);
  applyPosition(result, params.position);
  applyRotation(result, params.rotation);
  if (isDefined(params.scale)) applyScale(result, params.scale);
  result.update();

  return result;
}
