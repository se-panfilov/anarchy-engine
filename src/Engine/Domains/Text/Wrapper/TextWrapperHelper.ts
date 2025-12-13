import { TextCssClass } from '@/Engine/Domains/Text/Constants';
import type { IElement2dAccessors, ITextCssProps } from '@/Engine/Domains/Text/Models';
import { isDefined } from '@/Engine/Utils';

export function applyHtmlElementParams(element: IElement2dAccessors, cssProps: ITextCssProps): void {
  Object.keys(cssProps).forEach((paramName: string): void => {
    const value: string | undefined = cssProps[paramName as keyof ITextCssProps];
    if (isDefined(value)) element.setCssProperty(paramName, value);
  });
  element.appendCssProperty('className', TextCssClass.Text2d);
}
