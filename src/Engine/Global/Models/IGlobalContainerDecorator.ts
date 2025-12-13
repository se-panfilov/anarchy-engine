import type { TAppCanvas } from '@/Engine/App';
import type { IAppGlobalContainer } from '@/Engine/Global';

export type IGlobalContainerDecorator = Readonly<{
  id: string;
  getWidth: () => number;
  getHeight: () => number;
  getRatio: () => number;
  startWatch: (type: string, cb: (...args: ReadonlyArray<never>) => void) => void;
  stopWatch: (type: string, cb: (...args: ReadonlyArray<never>) => void) => void;
  getCanvasElement: (selector: string) => TAppCanvas | null;
  getAppContainer: () => IAppGlobalContainer;
}>;
