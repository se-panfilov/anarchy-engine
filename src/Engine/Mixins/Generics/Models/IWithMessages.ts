import type { Observable } from 'rxjs';

export type IWithMessages = Readonly<{
  messages$: Observable<string>;
}>;
