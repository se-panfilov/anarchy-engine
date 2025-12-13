import type { TElementWithCssAccessors } from '@/Text/Models';
import type { TWriteable } from '@/Utils';
import { camelToKebab } from '@/Utils';

export function getCssAccessors(element: TWriteable<HTMLElement>): TElementWithCssAccessors {
  // eslint-disable-next-line functional/immutable-data
  const setText = (text: string): void => void (element.textContent = text);
  const getText = (): string => element.textContent ?? '';
  // eslint-disable-next-line functional/immutable-data
  const setClassName = (name: string): void => void (element.className = name);
  const setCssProperty = (name: string, value: string | null, priority?: string): void => element.style.setProperty(camelToKebab(name), value, priority);
  // eslint-disable-next-line functional/immutable-data
  const appendClassName = (name: string): void => void (element.className = (element.className + ' ' + name).trim());
  const getCssProperty = (name: string): string => element.style.getPropertyValue(name);

  return {
    setText,
    getText,
    setClassName,
    appendClassName,
    setCssProperty,
    getCssProperty
  };
}
