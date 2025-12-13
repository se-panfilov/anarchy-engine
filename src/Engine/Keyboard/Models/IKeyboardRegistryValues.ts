import type { Subject } from 'rxjs';

export type IKeyboardRegistryValues = {
  pressed$: Subject<string>;
  pressing$: Subject<string>;
  released$: Subject<string>;
};
