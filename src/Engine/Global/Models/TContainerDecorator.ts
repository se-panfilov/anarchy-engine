import type { TAppGlobalContainer } from '@/Engine/Global';
import type { TNoSpread, TWithId } from '@/Engine/Mixins';

export type TContainerDecorator = Readonly<{
  getWidth: () => number;
  getHeight: () => number;
  getRatio: () => number;
  startWatch: (type: string, cb: (...args: ReadonlyArray<never>) => void) => void;
  stopWatch: (type: string, cb: (...args: ReadonlyArray<never>) => void) => void;
  getAppContainer: () => TAppGlobalContainer | never;
}> &
  TWithId &
  TNoSpread;
