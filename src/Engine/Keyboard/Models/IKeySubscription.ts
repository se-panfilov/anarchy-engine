import type { Observable } from 'rxjs';

import type { IGameKey } from './IGameKey';

export type IKeySubscription = {
  pressed$: Observable<IGameKey | string>;
  pressing$: Observable<IGameKey | string>;
  released$: Observable<IGameKey | string>;
};
