import { nanoid } from 'nanoid';

import type { IAppCanvas } from '@/Engine/App';
import type { IAppGlobalContainer, IGlobalContainerDecorator } from '@/Engine/Global/Models';

export function ContainerDecorator(container: IAppGlobalContainer): IGlobalContainerDecorator {
  return {
    id: nanoid(),
    getWidth: (): number => container.innerWidth,
    getHeight: (): number => container.innerHeight,
    getRatio: (): number => container.devicePixelRatio || 1,
    startWatch: (type: string, cb: () => void): void => container.addEventListener(type, cb),
    stopWatch: (type: string, cb: () => void): void => container.removeEventListener(type, cb),
    getCanvasElement: (selector: string): IAppCanvas | null => container.document.querySelector(selector),
    getAppContainer: (): IAppGlobalContainer => container
  };
}
