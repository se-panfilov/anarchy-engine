import type { IGlobalContainerDecorator } from '@Engine/Global/Models';
import type { IAppGlobalContainer } from '@Engine/Models/IAppGlobalContainer';
import { nanoid } from 'nanoid';

import type { IAppCanvas } from '@/Engine';

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
