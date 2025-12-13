import '@/Engine/Domains/Text/Styles/font-elements.css';

import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

import { AbstractWrapper } from '@/Engine/Domains/Abstract';
import { RelatedEntityAttribute, TextType } from '@/Engine/Domains/Text/Constants';
import type { ITextParams, ITextWrapper } from '@/Engine/Domains/Text/Models';
import { getCssAccessors } from '@/Engine/Domains/Text/Wrapper/Accessors';
import { applyHtmlElementParams, getWrapperTypeByTextType } from '@/Engine/Domains/Text/Wrapper/TextWrapperHelper';
import { scalableMixin, withMoveBy3dMixin, withObject3d, withRotationByXyzMixin } from '@/Engine/Mixins';
import { applyCenter, applyObject3dParams, applyPosition, applyRotation, applyScale, isDefined } from '@/Engine/Utils';

export function createTextWrapper<T extends CSS2DObject | CSS3DObject>(params: ITextParams, type: TextType): ITextWrapper<T> {
  const element: HTMLElement = document.createElement(params.elementType || 'div');
  // eslint-disable-next-line functional/immutable-data
  element.textContent = params.text;

  const entity: T = type === TextType.Text2d ? (new CSS2DObject(element) as T) : (new CSS3DObject(element) as T);

  const result: ITextWrapper<T> = {
    type,
    ...AbstractWrapper(entity, getWrapperTypeByTextType(type), params),
    ...getCssAccessors(element),
    ...withMoveBy3dMixin(entity),
    ...withRotationByXyzMixin(entity),
    ...scalableMixin(entity),
    ...withObject3d(entity),
    getElement: () => element
  };

  element.setAttribute(RelatedEntityAttribute, result.id.toString());

  // TODO (S.Panfilov) we are removing element, but do not dispose entity (but we should)
  result.destroyed$.subscribe(() => document.body.removeChild(element));

  document.body.appendChild(element);

  result.setText(params.text);
  applyHtmlElementParams(result, params.cssProps);
  applyObject3dParams(result, params);
  applyPosition(result, params.position);
  if (type === TextType.Text2d) applyCenter(entity as CSS2DObject, params.center);
  applyRotation(result, params.rotation);
  if (isDefined(params.scale)) applyScale(result, params.scale);

  return result;
}
