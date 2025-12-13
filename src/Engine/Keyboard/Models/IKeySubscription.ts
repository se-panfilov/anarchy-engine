import type { Observable } from 'rxjs';
import type { Key } from 'ts-key-enum';

export type IKeySubscription = {
  pressed$: Observable<Key | string>;
  pressing$: Observable<Key | string>;
  released$: Observable<Key | string>;
};
