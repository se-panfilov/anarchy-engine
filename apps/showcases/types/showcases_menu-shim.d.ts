import type { TFromMenuEvent, TMenuOptions, TToMenuEvent } from '@ShowcasesShared';
import type { Observable, Subject } from 'rxjs';

//Suppress TS check for showcases_menu app (assume it's always "any")
export const initMenuApp: (id: string, fromMenuEventsBus$: Subject<TFromMenuEvent>, toMenuEventsBus$: Observable<TToMenuEvent>, options?: TMenuOptions) => void;
export default {};
