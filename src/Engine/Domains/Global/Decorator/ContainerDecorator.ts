import type { IAppCanvas } from '@Engine/Domains/App';
import { nanoid } from 'nanoid';

import type { IAppGlobalContainer, IGlobalContainerDecorator } from '@/Engine/Domains/Global/Models';

export function ContainerDecorator(container: IAppGlobalContainer): IGlobalContainerDecorator {
  return {
    get id(): string {
      return nanoid();
    },
    get width(): number {
      return container.innerWidth;
    },
    get height(): number {
      return container.innerHeight;
    },
    get ratio(): number {
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
