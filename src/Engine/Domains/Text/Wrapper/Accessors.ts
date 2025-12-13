import type { IElement2dAccessors } from '@/Engine/Domains/Text/Models';
import type { IWriteable } from '@/Engine/Utils';
import { camelToKebab } from '@/Engine/Utils';

export function getCssAccessors(element: IWriteable<HTMLElement>): IElement2dAccessors {
  // eslint-disable-next-line functional/immutable-data
  const setText = (text: string): void => void (element.textContent = text);
  const setCssProperty = (name: string, value: string): void => void element.style.setProperty(camelToKebab(name), value);
  const appendCssProperty = (name: string, value: string): void => void element.style.setProperty(name, value);
  const getCssProperty = (name: string): string => element.style.getPropertyValue(name);

  return {
    setText,
    setCssProperty,
    appendCssProperty,
    getCssProperty
  };
}
