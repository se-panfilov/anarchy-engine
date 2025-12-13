import { nanoid } from 'nanoid';

import type { TAppGlobalContainer, TContainerDecorator } from '@/Engine/Global/Models';

export function ContainerDecorator(container: TAppGlobalContainer): TContainerDecorator {
  return {
    id: nanoid(),
    getWidth: (): number => container.innerWidth,
    getHeight: (): number => container.innerHeight,
    getRatio: (): number => container.devicePixelRatio || 1,
    startWatch: (type: string, cb: () => void): void => container.addEventListener(type, cb),
    stopWatch: (type: string, cb: () => void): void => container.removeEventListener(type, cb),
    getAppContainer: (): TAppGlobalContainer => container
  };
}
