import '@/Engine/Text/Styles/font-elements.css';

import { Mesh, MeshBasicMaterial, PlaneGeometry, TextureLoader } from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

import { AbstractWrapper } from '@/Engine/Abstract';
import { scalableMixin, withMoveBy3dMixin, withObject3d, withRotationByXyzMixin } from '@/Engine/Mixins';
import { RelatedEntityAttribute, TextCssClass, TextType } from '@/Engine/Text/Constants';
import type { TTextParams, TTextWrapper } from '@/Engine/Text/Models';
import { getCssAccessors } from '@/Engine/Text/Wrappers/Accessors';
import { applyHtmlElementParams, getWrapperTypeByTextType } from '@/Engine/Text/Wrappers/TextWrapperHelper';
import { applyCenter, applyObject3dParams, applyPosition, applyRotation, applyScale, isDefined } from '@/Engine/Utils';

export function createTextWrapper<T extends CSS2DObject | CSS3DObject | Mesh>(params: TTextParams, type: TextType): TTextWrapper<T> {
  const element: HTMLElement = document.createElement(params.elementType || 'div');
  // eslint-disable-next-line functional/immutable-data
  element.textContent = params.text;
  const entity: T = createText(type, element);

  const result: TTextWrapper<T> = {
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

  // TODO we are removing element, but do not dispose entity (but we should)
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

function createText(type: TextType, element: HTMLElement): CSS2DObject | CSS3DObject | Mesh | never {
  switch (type) {
    case TextType.Text2d:
      return new CSS2DObject(element);
    case TextType.Text3dTexture:
      return createTextSprite('SomeLocalText');
    case TextType.Text3d:
      return new CSS3DObject(element);
    default:
      throw new Error(`TextWrapper. createText: Unknown text type "${type}"`);
  }
}

function createTextSprite(text: string, fontSize = 64, color = '#ffffff'): Mesh {
  console.log('XXX', text);
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  canvas.width = 256;
  canvas.height = 128;

  context.font = `${fontSize}px Arial`;
  context.fillStyle = color;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new TextureLoader().load(canvas.toDataURL());
  const material = new MeshBasicMaterial({ map: texture, transparent: true });
  const geometry = new PlaneGeometry(1, 0.5);
  return new Mesh(geometry, material);
}
