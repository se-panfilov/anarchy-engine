import type { Observable } from 'rxjs';

import type { IGameKey } from './IGameKey';
import type { IKeyCombo } from './IKeyCombo';

export type IKeySubscription = {
  pressed$: Observable<IGameKey | IKeyCombo>;
  pressing$: Observable<IGameKey | IKeyCombo>;
  released$: Observable<IGameKey | IKeyCombo>;
};
