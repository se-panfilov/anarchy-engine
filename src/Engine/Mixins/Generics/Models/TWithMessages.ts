import type { Observable } from 'rxjs';

export type TWithMessages = Readonly<{
  messages$: Observable<string>;
}>;
