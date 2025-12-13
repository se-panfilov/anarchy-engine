import type { BehaviorSubject, Observable } from 'rxjs';

import type { TAppGlobalContainer } from '@/Engine/Global';
import type { TDestroyable, TNoSpread, TWithId } from '@/Engine/Mixins';

export type TContainerDecorator = Readonly<{
  getWidth: () => number;
  getHeight: () => number;
  getRatio: () => number;
  startWatch: (type: string, cb: (...args: ReadonlyArray<never>) => void) => void;
  stopWatch: (type: string, cb: (...args: ReadonlyArray<never>) => void) => void;
  getAppContainer: () => TAppGlobalContainer | never;
  getElement: () => TAppGlobalContainer | HTMLElement;
  resize$: Observable<DOMRect>;
  viewportRect$: BehaviorSubject<DOMRect | undefined>;
}> &
  TWithId &
  TNoSpread &
  TDestroyable;
