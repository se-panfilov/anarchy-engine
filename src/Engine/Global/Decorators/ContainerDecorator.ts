import { nanoid } from 'nanoid';

import type { TAppCanvas } from '@/Engine/App';
import type { TAppGlobalContainer, TGlobalContainerDecorator } from '@/Engine/Global/Models';

export function ContainerDecorator(container: TAppGlobalContainer): TGlobalContainerDecorator {
  return {
    id: nanoid(),
    getWidth: (): number => container.innerWidth,
    getHeight: (): number => container.innerHeight,
    getRatio: (): number => container.devicePixelRatio || 1,
    startWatch: (type: string, cb: () => void): void => container.addEventListener(type, cb),
    stopWatch: (type: string, cb: () => void): void => container.removeEventListener(type, cb),
    getCanvasElement: (selector: string): TAppCanvas | null => container.document.querySelector(selector),
    getAppContainer: (): TAppGlobalContainer => container
  };
}
