import type { TKeyboardService, TMouseService } from '@Anarchy/Engine';
import { KeyCode, KeysExtra } from '@Anarchy/Engine';
import type { TToGuiEvent } from '@Showcases/Shared';
import type { Subject } from 'rxjs';
import { GuiActionType } from 'showcases-gui/src/constants';
import { ToGuiActionEvent } from 'showcases-gui/src/events';

export function initGuiEvents(keyboardService: TKeyboardService, mouseService: TMouseService, toGuiEventsBus$: Subject<TToGuiEvent>): void {
  const { clickLeftRelease$, clickLeftPress$, clickRightPress$, clickRightRelease$ } = mouseService;
  const { onKey } = keyboardService;

  const { Attack, Defense, Map, Inventory, Settings } = GuiActionType;

  clickLeftPress$.subscribe((): void => toGuiEventsBus$.next(ToGuiActionEvent(Attack, true)));
  clickLeftRelease$.subscribe((): void => toGuiEventsBus$.next(ToGuiActionEvent(Attack, false)));

  clickRightPress$.subscribe((): void => toGuiEventsBus$.next(ToGuiActionEvent(Defense, true)));
  clickRightRelease$.subscribe((): void => toGuiEventsBus$.next(ToGuiActionEvent(Defense, false)));

  onKey(KeyCode.I).pressed$.subscribe((): void => toGuiEventsBus$.next(ToGuiActionEvent(Inventory, true)));
  onKey(KeyCode.I).released$.subscribe((): void => toGuiEventsBus$.next(ToGuiActionEvent(Inventory, false)));
  onKey(KeyCode.M).pressed$.subscribe((): void => toGuiEventsBus$.next(ToGuiActionEvent(Map, true)));
  onKey(KeyCode.M).released$.subscribe((): void => toGuiEventsBus$.next(ToGuiActionEvent(Map, false)));
  onKey(KeysExtra.Escape).pressed$.subscribe((): void => toGuiEventsBus$.next(ToGuiActionEvent(Settings, true)));
  onKey(KeysExtra.Escape).released$.subscribe((): void => toGuiEventsBus$.next(ToGuiActionEvent(Settings, false)));
}
