import type { IElementWithCssAccessors } from '@/Engine/Text/Models';
import type { IWriteable } from '@/Engine/Utils';
import { camelToKebab } from '@/Engine/Utils';

export function getCssAccessors(element: IWriteable<HTMLElement>): IElementWithCssAccessors {
  // eslint-disable-next-line functional/immutable-data
  const setText = (text: string): void => void (element.textContent = text);
  // eslint-disable-next-line functional/immutable-data
  const setClassName = (name: string): void => void (element.className = name);
  const setCssProperty = (name: string, value: string | null, priority?: string): void => element.style.setProperty(camelToKebab(name), value, priority);
  // eslint-disable-next-line functional/immutable-data
  const appendClassName = (name: string): void => void (element.className = (element.className + ' ' + name).trim());
  const getCssProperty = (name: string): string => element.style.getPropertyValue(name);

  return {
    setText,
    setClassName,
    appendClassName,
    setCssProperty,
    getCssProperty
  };
}
