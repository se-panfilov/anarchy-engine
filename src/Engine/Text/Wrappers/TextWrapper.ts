import '@/Engine/Text/Styles/font-elements.css';

import type { Subscription } from 'rxjs';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

import type { TAbstractWrapper } from '@/Engine/Abstract';
import { AbstractWrapper } from '@/Engine/Abstract';
import { withObject3d } from '@/Engine/Mixins';
import { textToConfig } from '@/Engine/Text/Adapters';
import { RelatedEntityAttribute, TextCssClass, TextType } from '@/Engine/Text/Constants';
import type { TTextConfig, TTextParams, TTextServiceDependencies, TTextTransformDrive, TTextWrapper } from '@/Engine/Text/Models';
import { TextTransformDrive } from '@/Engine/Text/TransformDrive';
import { getCssAccessors } from '@/Engine/Text/Wrappers/Accessors';
import { applyHtmlElementParams, getWrapperTypeByTextType } from '@/Engine/Text/Wrappers/TextWrapperHelper';
import type { TDriveToTargetConnector } from '@/Engine/TransformDrive';
import { DriveToTargetConnector } from '@/Engine/TransformDrive';
import { applyCenter, applyObject3dParams, isDefined } from '@/Engine/Utils';

export function createTextWrapper<T extends CSS2DObject | CSS3DObject>(params: TTextParams, type: TextType, dependencies: TTextServiceDependencies): TTextWrapper<T> {
  let element: HTMLElement = document.createElement(params.elementType || 'div');
  // eslint-disable-next-line functional/immutable-data
  element.textContent = params.text;
  const entity: T = createText(type, element) as T;

  const wrapper: TAbstractWrapper<T> = AbstractWrapper(entity, getWrapperTypeByTextType(type), { name: params.name });
  const drive: TTextTransformDrive = TextTransformDrive(params, dependencies, wrapper.id);
  const driveToTargetConnector: TDriveToTargetConnector = DriveToTargetConnector(drive, entity);

  // eslint-disable-next-line functional/immutable-data
  const result: TTextWrapper<T> = Object.assign(wrapper, {
    type,
    drive,
    driveToTargetConnector,
    ...getCssAccessors(element),
    ...withObject3d(entity),
    getElement: (): HTMLElement => element,
    serialize: (): TTextConfig => textToConfig(result)
  });

  element.setAttribute(RelatedEntityAttribute, result.id.toString());

  const destroySub$: Subscription = result.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    // eslint-disable-next-line functional/immutable-data
    element.className = '';
    element.removeAttribute('style');
    if (element?.parentElement) element?.parentElement.removeChild(element);
    element?.remove();
    element = null as any;

    if (entity.element?.parentNode) entity.element.remove();
    // eslint-disable-next-line functional/immutable-data
    entity.element = null as any;
  });

  document.body.appendChild(element);

  result.setText(params.text);
  if (isDefined(params.cssProps)) applyHtmlElementParams(result, params.cssProps, type === TextType.Text2d ? TextCssClass.Text2d : TextCssClass.Text3d);
  applyObject3dParams(result, params);
  if (type === TextType.Text2d) applyCenter(entity as CSS2DObject, params.center);

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
