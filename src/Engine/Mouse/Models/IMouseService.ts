import type { Observable } from 'rxjs';

import type { IMousePosition } from './IMousePosition';

export type IMouseService = {
  click$: Observable<void>;
  position$: Observable<IMousePosition>;
  // doubleClick$: Observable<any>;
  // wheel$: Observable<any>;
  // pressed$: Observable<any>;
  // drag$: Observable<any>;
};
