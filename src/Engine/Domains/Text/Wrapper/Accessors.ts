import type { IElement2dAccessors } from '@/Engine/Domains/Text/Models';
import type { IWriteable } from '@/Engine/Utils';
import { camelToKebab } from '@/Engine/Utils';

export function getCssAccessors(element: IWriteable<HTMLElement>): IElement2dAccessors {
  // eslint-disable-next-line functional/immutable-data
  const setText = (text: string): void => void (element.textContent = text);
  const setCssProperty = (name: string, value: string | null, priority?: string): void => element.style.setProperty(camelToKebab(name), value, priority);
  const appendCssProperty = (name: string, value: string): void => {
    const property: string = element.style.getPropertyValue(name);
    element.style.setProperty(name, (property + ' ' + value).trim());
  };
  const getCssProperty = (name: string): string => element.style.getPropertyValue(name);

  return {
    setText,
    setCssProperty,
    appendCssProperty,
    getCssProperty
  };
}
