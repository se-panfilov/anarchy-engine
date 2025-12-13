import { WrapperType } from '@/Engine/Abstract';
import type { TextCssClass } from '@/Engine/Text/Constants';
import { TextType } from '@/Engine/Text/Constants';
import type { IElementWithCssAccessors, ITextCssProps } from '@/Engine/Text/Models';
import type { TValueOf } from '@/Engine/Utils';
import { isDefined, isString } from '@/Engine/Utils';

export function applyHtmlElementParams(wrapper: IElementWithCssAccessors, cssProps: ITextCssProps, className: TextCssClass): void {
  Object.keys(cssProps).forEach((paramName: string): void => {
    const value: TValueOf<ITextCssProps> = cssProps[paramName as keyof ITextCssProps];
    if (isDefined(value) && isString(value)) wrapper.setCssProperty(paramName, value);
  });
  wrapper.appendClassName(className);
}

export function getWrapperTypeByTextType(type: TextType): WrapperType {
  if (type === TextType.Text2d) return WrapperType.Text2d;
  if (type === TextType.Text3d) return WrapperType.Text3d;
  throw new Error(`Cannot get wrapper type: Unknown text type "${String(type)}"`);
}
