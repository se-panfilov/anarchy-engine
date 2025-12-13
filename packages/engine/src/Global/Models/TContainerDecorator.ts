import type { BehaviorSubject, Observable } from 'rxjs';

import type { TAppGlobalContainer } from '@/Global';
import type { TDestroyable, TNoSpread, TWithId } from '@/Mixins';
import type { TSpaceCanvas } from '@/Space';

export type TContainerDecorator = Readonly<{
  getWidth: () => number;
  getHeight: () => number;
  getRatio: () => number;
  startWatch: (type: string, cb: (...args: ReadonlyArray<never>) => void) => void;
  stopWatch: (type: string, cb: (...args: ReadonlyArray<never>) => void) => void;
  getAppContainer: () => TAppGlobalContainer | never;
  getElement: () => TAppGlobalContainer | HTMLElement;
  resize$: Observable<DOMRect>;
  canvas$: BehaviorSubject<TSpaceCanvas | undefined>;
  fullScreen$: BehaviorSubject<boolean>;
  viewportRect$: BehaviorSubject<DOMRect>;
}> &
  TWithId &
  TNoSpread &
  TDestroyable;
