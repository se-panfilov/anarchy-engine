import '@/Engine/Text/Styles/font-elements.css';

import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

import { AbstractWrapper } from '@/Engine/Abstract';
import { withObject3d } from '@/Engine/Mixins';
import { RelatedEntityAttribute, TextCssClass, TextType } from '@/Engine/Text/Constants';
import type { TTextDependencies, TTextParams, TTextTransformDrive, TTextWrapper } from '@/Engine/Text/Models';
import { TextTransformDrive } from '@/Engine/Text/TransformDrive';
import { getCssAccessors } from '@/Engine/Text/Wrappers/Accessors';
import { applyHtmlElementParams, getWrapperTypeByTextType } from '@/Engine/Text/Wrappers/TextWrapperHelper';
import type { TDriveToTargetConnector } from '@/Engine/TransformDrive';
import { DriveToTargetConnector } from '@/Engine/TransformDrive';
import { applyCenter, applyObject3dParams, isDefined } from '@/Engine/Utils';

export function createTextWrapper<T extends CSS2DObject | CSS3DObject>(params: TTextParams, type: TextType, dependencies: TTextDependencies): TTextWrapper<T> {
  const element: HTMLElement = document.createElement(params.elementType || 'div');
  // eslint-disable-next-line functional/immutable-data
  element.textContent = params.text;
  const entity: T = createText(type, element) as T;

  const drive: TTextTransformDrive = TextTransformDrive(params, dependencies);
  const driveToTargetConnector: TDriveToTargetConnector = DriveToTargetConnector(drive, entity);

  const result: TTextWrapper<T> = {
    ...AbstractWrapper(entity, getWrapperTypeByTextType(type), params),
    type,
    drive,
    ...getCssAccessors(element),
    ...withObject3d(entity),
    getElement: () => element
  };

  element.setAttribute(RelatedEntityAttribute, result.id.toString());

  // TODO we are removing element, but do not dispose entity (but we should)
  result.destroy$.subscribe(() => document.body.removeChild(element));

  document.body.appendChild(element);

  result.setText(params.text);
  if (isDefined(params.cssProps)) applyHtmlElementParams(result, params.cssProps, type === TextType.Text2d ? TextCssClass.Text2d : TextCssClass.Text3d);
  applyObject3dParams(result, params);
  if (type === TextType.Text2d) applyCenter(entity as CSS2DObject, params.center);

  result.destroy$.subscribe((): void => driveToTargetConnector.destroy$.next());

  return result;
}

function createText(type: TextType, element: HTMLElement): CSS2DObject | CSS3DObject | never {
  switch (type) {
    case TextType.Text2d:
      return new CSS2DObject(element);
    case TextType.Text3d:
      return new CSS3DObject(element);
    default:
      throw new Error(`TextWrapper. createText: Unknown text type "${type}"`);
  }
}
