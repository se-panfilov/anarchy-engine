import type { TKeyboardService, TMouseService } from '@Anarchy/Engine';
import { KeyCode, KeysExtra } from '@Anarchy/Engine';
import type { TToGuiEvent } from '@Showcases/Shared';
import { ToGuiEvents } from '@Showcases/Shared';
import type { Subject } from 'rxjs';
import { GuiActionType } from 'showcases-gui/src/constants';
import type { TToGuiActionEvent } from 'showcases-gui/src/models';

export function initGuiEvents(keyboardService: TKeyboardService, mouseService: TMouseService, toGuiEventsBus$: Subject<TToGuiEvent>): void {
  const { clickLeftRelease$, clickLeftPress$, clickRightPress$, clickRightRelease$ } = mouseService;
  const { onKey } = keyboardService;

  const { KeyAction } = ToGuiEvents;
  const { Attack, Defense, Map, Inventory, Settings } = GuiActionType;

  clickLeftPress$.subscribe((): void => toGuiEventsBus$.next({ type: KeyAction, payload: { type: Attack, value: true } } satisfies TToGuiActionEvent));
  clickLeftRelease$.subscribe((): void => toGuiEventsBus$.next({ type: KeyAction, payload: { type: Attack, value: false } } satisfies TToGuiActionEvent));

  clickRightPress$.subscribe((): void => toGuiEventsBus$.next({ type: KeyAction, payload: { type: Defense, value: true } } satisfies TToGuiActionEvent));
  clickRightRelease$.subscribe((): void => toGuiEventsBus$.next({ type: KeyAction, payload: { type: Defense, value: false } } satisfies TToGuiActionEvent));

  onKey(KeyCode.I).pressed$.subscribe((): void => toGuiEventsBus$.next({ type: KeyAction, payload: { type: Inventory, value: true } } satisfies TToGuiActionEvent));
  onKey(KeyCode.I).released$.subscribe((): void => toGuiEventsBus$.next({ type: KeyAction, payload: { type: Inventory, value: false } } satisfies TToGuiActionEvent));
  onKey(KeyCode.M).pressed$.subscribe((): void => toGuiEventsBus$.next({ type: KeyAction, payload: { type: Map, value: true } } satisfies TToGuiActionEvent));
  onKey(KeyCode.M).released$.subscribe((): void => toGuiEventsBus$.next({ type: KeyAction, payload: { type: Map, value: false } } satisfies TToGuiActionEvent));
  onKey(KeysExtra.Escape).pressed$.subscribe((): void => toGuiEventsBus$.next({ type: KeyAction, payload: { type: Settings, value: true } } satisfies TToGuiActionEvent));
  onKey(KeysExtra.Escape).released$.subscribe((): void => toGuiEventsBus$.next({ type: KeyAction, payload: { type: Settings, value: false } } satisfies TToGuiActionEvent));
}
