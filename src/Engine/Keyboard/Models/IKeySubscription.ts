import type { Observable } from 'rxjs';

import type { ILoopTimes } from '@/Engine/Loop';

import type { IGameKey } from './IGameKey';
import type { IKeyCombo } from './IKeyCombo';

export type IKeySubscription = {
  pressed$: Observable<IGameKey | IKeyCombo>;
  pressing$: Observable<Readonly<{ key: IGameKey | IKeyCombo; delta: ILoopTimes }>>;
  released$: Observable<IGameKey | IKeyCombo>;
};
