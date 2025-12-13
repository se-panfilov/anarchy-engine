import type { IAppGlobalContainer } from '@Engine/Models/IAppGlobalContainer';
import type { IGlobalContainerDecorator } from '@Engine/Global/Models';

export function ContainerDecorator(container: IAppGlobalContainer): IGlobalContainerDecorator {
  return {
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
    }
  };
}
