import type { TFromGuiEvent, TMenuOptions, TToGuiEvent } from '@Showcases/Shared';
import type { Observable, Subject } from 'rxjs';

//Suppress TS check for showcases-gui app (assume it's always "any")
export const initGuiApp: (id: string, fromMenuEventsBus$: Subject<TFromGuiEvent>, toMenuEventsBus$: Observable<TToGuiEvent>, options?: TMenuOptions) => Promise<void>;
export default {};
