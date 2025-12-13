import { nanoid } from 'nanoid';

import type { IAppCanvas } from '@/Engine/Domains/App';
import type { IAppGlobalContainer, IGlobalContainerDecorator } from '@/Engine/Domains/Global/Models';

export function ContainerDecorator(container: IAppGlobalContainer): IGlobalContainerDecorator {
  return {
    id: nanoid(),
    getWidth(): number {
      return container.innerWidth;
    },
    getHeight(): number {
      return container.innerHeight;
    },
    getRatio(): number {
      return container.devicePixelRatio || 1;
    },
    startWatch(type: string, cb: () => void): void {
      return container.addEventListener(type, cb);
    },
    stopWatch(type: string, cb: () => void): void {
      return container.removeEventListener(type, cb);
    },
    getCanvasElement(selector: string): IAppCanvas | null {
      return container.document.querySelector(selector);
    }
  };
}
