import type { Observable } from 'rxjs';

import type { IMousePosition } from './IMousePosition';
import type { IMouseWatcherEvent } from './IMouseWatcherEvent';

export type IMouseService = {
  click$: Observable<IMouseWatcherEvent>;
  position$: Observable<IMousePosition>;
  // doubleClick$: Observable<any>;
  // wheel$: Observable<any>;
  // pressed$: Observable<any>;
  // drag$: Observable<any>;
};
