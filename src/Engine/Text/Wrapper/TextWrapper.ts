import '@/Engine/Text/Styles/font-elements.css';

import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

import { AbstractWrapper } from '@/Engine/Abstract';
import { scalableMixin, withMoveBy3dMixin, withObject3d, withRotationByXyzMixin } from '@/Engine/Mixins';
import { RelatedEntityAttribute, TextCssClass, TextType } from '@/Engine/Text/Constants';
import type { ITextParams, ITextWrapper } from '@/Engine/Text/Models';
import { getCssAccessors } from '@/Engine/Text/Wrapper/Accessors';
import { applyHtmlElementParams, getWrapperTypeByTextType } from '@/Engine/Text/Wrapper/TextWrapperHelper';
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
  if (isDefined(params.cssProps)) applyHtmlElementParams(result, params.cssProps, type === TextType.Text2d ? TextCssClass.Text2d : TextCssClass.Text3d);
  applyObject3dParams(result, params);
  applyPosition(result, params.position);
  if (type === TextType.Text2d) applyCenter(entity as CSS2DObject, params.center);
  applyRotation(result, params.rotation);
  if (isDefined(params.scale)) applyScale(result, params.scale);

  return result;
}
