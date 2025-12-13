import { nanoid } from 'nanoid';

import type { TAppGlobalContainer, TContainerDecorator } from '@/Engine/Global/Models';
import { getWindowFromDomElement, isNotDefined } from '@/Engine/Utils';

export function ContainerDecorator(container: TAppGlobalContainer | HTMLElement): TContainerDecorator {
  function getAppContainer(): TAppGlobalContainer | never {
    const globalContainer = getWindowFromDomElement(container);
    if (isNotDefined(globalContainer)) throw new Error(`Cannot find global ${container}`);
    return globalContainer;
  }

  return {
    id: nanoid(),
    getWidth: (): number => (container as TAppGlobalContainer).innerWidth ?? (container as HTMLElement).clientWidth,
    getHeight: (): number => (container as TAppGlobalContainer).innerHeight ?? (container as HTMLElement).clientHeight,
    getRatio: (): number => getAppContainer().devicePixelRatio || 1,
    startWatch: (type: string, cb: () => void): void => container.addEventListener(type, cb),
    stopWatch: (type: string, cb: () => void): void => container.removeEventListener(type, cb),
    getAppContainer,
    getElement: (): TAppGlobalContainer | HTMLElement => container
  };
}
