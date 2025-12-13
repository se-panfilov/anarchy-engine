import type { TMenuEvent, TMenuOptions } from '@ShowcasesShared';
import type { Subject } from 'rxjs';

//Suppress TS check for showcases-menu app (assume it's always "any")
export const initMenuApp: (id: string, bus: Subject<TMenuEvent>, options?: TMenuOptions) => void;
export default {};
