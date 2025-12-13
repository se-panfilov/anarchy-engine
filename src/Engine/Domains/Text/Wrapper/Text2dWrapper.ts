import '@/Engine/Domains/Text/Styles/font-elements.css';

import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';
import { RelatedEntityAttribute } from '@/Engine/Domains/Text/Constants';
import type { ITextParams, ITextWrapper } from '@/Engine/Domains/Text/Models';
import { getElement2dAccessors } from '@/Engine/Domains/Text/Wrapper/Accessors';
import { applyElement2dParams } from '@/Engine/Domains/Text/Wrapper/TextWrapperHelper';
import { scalableMixin, withMoveByXyzMixin, withObject3d, withRotationByXyzMixin } from '@/Engine/Mixins';
import { applyCenter, applyObject3dParams, applyPosition, applyRotation, applyScale, isDefined } from '@/Engine/Utils';

export function Text2dWrapper(params: ITextParams): ITextWrapper {
  const element: HTMLDivElement = document.createElement('div');
  // eslint-disable-next-line functional/immutable-data
  element.textContent = params.text;

  const entity: CSS2DObject = new CSS2DObject(element);

  const result = {
    ...AbstractWrapper(entity, WrapperType.Text, params),
    ...getElement2dAccessors(element),
    ...withMoveByXyzMixin(entity),
    ...withRotationByXyzMixin(entity),
    ...scalableMixin(entity),
    ...withObject3d(entity),
    getElement: () => element
  };

  element.setAttribute(RelatedEntityAttribute, result.id.toString());

  // TODO (S.Panfilov) we are removing element, but do not dispose entity (but we should)
  result.destroyed$.subscribe(() => document.body.removeChild(element));

  document.body.appendChild(element);

  applyElement2dParams(result, params);
  applyObject3dParams(result, params);
  applyPosition(result, params.position);
  applyCenter(entity, params.center);
  applyRotation(result, params.rotation);
  if (isDefined(params.scale)) applyScale(result, params.scale);

  return result;
}
