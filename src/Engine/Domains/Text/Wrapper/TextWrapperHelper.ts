import { WrapperType } from '@/Engine/Domains/Abstract';
import { TextCssClass, TextType } from '@/Engine/Domains/Text/Constants';
import type { IElementWithCssAccessors, ITextCssProps } from '@/Engine/Domains/Text/Models';
import type { IValueOf } from '@/Engine/Utils';
import { isDefined, isString } from '@/Engine/Utils';

export function applyHtmlElementParams(wrapper: IElementWithCssAccessors, cssProps: ITextCssProps): void {
  Object.keys(cssProps).forEach((paramName: string): void => {
    const value: IValueOf<ITextCssProps> = cssProps[paramName as keyof ITextCssProps];
    if (isDefined(value) && isString(value)) wrapper.setCssProperty(paramName, value);
  });
  wrapper.appendClassName(TextCssClass.Text2d);
}

export function getWrapperTypeByTextType(type: TextType): WrapperType {
  if (type === TextType.Text2d) return WrapperType.Text2d;
  if (type === TextType.Text3d) return WrapperType.Text3d;
  throw new Error(`Cannot get wrapper type: Unknown text type "${String(type)}"`);
}
