import { WrapperType } from '@Anarchy/Engine/Abstract';
import type { TextCssClass } from '@Anarchy/Engine/Text/Constants';
import { TextType } from '@Anarchy/Engine/Text/Constants';
import type { TElementWithCssAccessors, TTextCssProps } from '@Anarchy/Engine/Text/Models';
import type { TValueOf } from '@Anarchy/Shared/Utils';
import { isDefined, isString } from '@Anarchy/Shared/Utils';

export function applyHtmlElementParams(wrapper: TElementWithCssAccessors, cssProps: TTextCssProps, className: TextCssClass): void {
  Object.keys(cssProps).forEach((paramName: string): void => {
    const value: TValueOf<TTextCssProps> = cssProps[paramName as keyof TTextCssProps];
    if (isDefined(value) && isString(value)) wrapper.setCssProperty(paramName, value);
  });
  wrapper.appendClassName(className);
}

export function getWrapperTypeByTextType(type: TextType): WrapperType {
  if (type === TextType.Text2d) return WrapperType.Text2d;
  if (type === TextType.Text3d) return WrapperType.Text3d;
  if (type === TextType.Text3dTexture) return WrapperType.Text3dTexture;
  throw new Error(`Cannot get wrapper type: Unknown text type "${String(type)}"`);
}
