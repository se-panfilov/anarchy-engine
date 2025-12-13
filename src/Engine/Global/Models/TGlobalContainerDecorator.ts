import type { TAppCanvas } from '@/Engine/App';
import type { TAppGlobalContainer } from '@/Engine/Global';
import type { TNoSpread, TWithId } from '@/Engine/Mixins';

export type TGlobalContainerDecorator = Readonly<{
  getWidth: () => number;
  getHeight: () => number;
  getRatio: () => number;
  startWatch: (type: string, cb: (...args: ReadonlyArray<never>) => void) => void;
  stopWatch: (type: string, cb: (...args: ReadonlyArray<never>) => void) => void;
  getCanvasElement: (selector: string) => TAppCanvas | null;
  getAppContainer: () => TAppGlobalContainer;
}> &
  TWithId &
  TNoSpread;
