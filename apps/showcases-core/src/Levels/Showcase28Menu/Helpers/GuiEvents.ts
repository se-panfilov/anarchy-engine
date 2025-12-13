import type { TKeyboardService, TMouseService } from '@Anarchy/Engine';
import { KeyCode, KeysExtra, MouseButtonValue } from '@Anarchy/Engine';
import type { TToGuiEvent } from '@Showcases/Shared';
import { ToGuiEvents } from '@Showcases/Shared';
import type { Subject } from 'rxjs';

export function initGuiEvents(keyboardService: TKeyboardService, mouseService: TMouseService, toGuiEventsBus$: Subject<TToGuiEvent>): void {
  const { clickLeftRelease$, clickLeftPress$, clickRightPress$, clickRightRelease$ } = mouseService;
  const { onKey } = keyboardService;

  const { KeyPress, KeyRelease } = ToGuiEvents;
  const { Left, Right } = MouseButtonValue;

  clickLeftPress$.subscribe((): void => toGuiEventsBus$.next({ type: KeyPress, payload: { key: Left, source: 'Mouse' } }));
  clickLeftRelease$.subscribe((): void => toGuiEventsBus$.next({ type: KeyRelease, payload: { key: Left, source: 'Mouse' } }));

  clickRightPress$.subscribe((): void => toGuiEventsBus$.next({ type: KeyPress, payload: { key: Right, source: 'Mouse' } }));
  clickRightRelease$.subscribe((): void => toGuiEventsBus$.next({ type: KeyRelease, payload: { key: Right, source: 'Mouse' } }));

  onKey(KeyCode.I).pressed$.subscribe((): void => toGuiEventsBus$.next({ type: KeyPress, payload: { key: KeyCode.I, source: 'Keyboard' } }));
  onKey(KeyCode.M).pressed$.subscribe((): void => toGuiEventsBus$.next({ type: KeyPress, payload: { key: KeyCode.M, source: 'Keyboard' } }));
  onKey(KeysExtra.Escape).pressed$.subscribe((): void => toGuiEventsBus$.next({ type: KeyPress, payload: { key: KeysExtra.Escape, source: 'Keyboard' } }));
}
