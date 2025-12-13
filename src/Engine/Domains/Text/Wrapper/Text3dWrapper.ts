import '@/Engine/Domains/Text/Styles/font-elements.css';

import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';
import { RelatedEntityAttribute, TextType } from '@/Engine/Domains/Text/Constants';
import type { IText3dWrapper, ITextParams } from '@/Engine/Domains/Text/Models';
import { getElement2dAccessors } from '@/Engine/Domains/Text/Wrapper/Accessors';
import { applyElement2dParams } from '@/Engine/Domains/Text/Wrapper/TextWrapperHelper';
import { scalableMixin, withMoveByXyzMixin, withObject3d, withRotationByXyzMixin } from '@/Engine/Mixins';
import { applyObject3dParams, applyPosition, applyRotation, applyScale, isDefined } from '@/Engine/Utils';

export function Text3dWrapper(params: ITextParams): IText3dWrapper {
  const element: HTMLElement = document.createElement(params.elementType || 'div');
  // eslint-disable-next-line functional/immutable-data
  element.textContent = params.text;
  const entity: CSS3DObject = new CSS3DObject(element);

  const result = {
    type: TextType.Text3d,
    ...AbstractWrapper(entity, WrapperType.Text3d, params),
    // TODO (S.Panfilov) getElement2dAccessors?
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

  // TODO (S.Panfilov) applyElement2dParams?
  applyElement2dParams(result, params);
  applyObject3dParams(result, params);
  applyPosition(result, params.position);
  // TODO (S.Panfilov) applyCenter?
  // applyCenter(entity, params.center);
  applyRotation(result, params.rotation);
  if (isDefined(params.scale)) applyScale(result, params.scale);

  return result;
}
