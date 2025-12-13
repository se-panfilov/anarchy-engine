import type { Observable } from 'rxjs';

export type IMouseService = {
  // TODO (S.Panfilov) any
  click$: Observable<any>;
  position$: Observable<any>;
  // doubleClick$: Observable<any>;
  // wheel$: Observable<any>;
  // pressed$: Observable<any>;
  // drag$: Observable<any>;
};
