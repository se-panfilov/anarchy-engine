import type { Subject } from 'rxjs';

import type { IKeyCombo } from '@/Engine/Keyboard';
import type { IGameKey } from '@/Engine/Keyboard/Models';
import type { ILoopTimes } from '@/Engine/Loop';

export type IKeyboardRegistryValues = {
  pressed$: Subject<string>;
  pressing$: Subject<Readonly<{ key: IGameKey | IKeyCombo; delta: ILoopTimes }>>;
  released$: Subject<string>;
};
