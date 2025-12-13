import type { Observable } from 'rxjs';

export type IKeySubscription = {
  pressed$: Observable<string>;
  pressing$: Observable<string>;
  released$: Observable<string>;
};
