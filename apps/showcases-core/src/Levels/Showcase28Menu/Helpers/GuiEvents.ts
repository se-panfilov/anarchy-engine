import type { TKeyboardService, TMouseService } from '@Anarchy/Engine';
import { KeyCode, KeysExtra } from '@Anarchy/Engine';
import type { TToGuiEvent } from '@Showcases/Shared';
import type { Subject } from 'rxjs';
import { GuiActionType } from 'showcases-gui/src/constants';
import { createToGuiActionEvent } from 'showcases-gui/src/events';

export function initGuiEvents(keyboardService: TKeyboardService, mouseService: TMouseService, toGuiEventsBus$: Subject<TToGuiEvent>): void {
  const { clickLeftRelease$, clickLeftPress$, clickRightPress$, clickRightRelease$ } = mouseService;
  const { onKey } = keyboardService;

  const { Attack, Defense, MiniMap, Inventory, Settings } = GuiActionType;

  clickLeftPress$.subscribe((): void => toGuiEventsBus$.next(createToGuiActionEvent(Attack, true)));
  clickLeftRelease$.subscribe((): void => toGuiEventsBus$.next(createToGuiActionEvent(Attack, false)));

  clickRightPress$.subscribe((): void => toGuiEventsBus$.next(createToGuiActionEvent(Defense, true)));
  clickRightRelease$.subscribe((): void => toGuiEventsBus$.next(createToGuiActionEvent(Defense, false)));

  onKey(KeyCode.I).pressed$.subscribe((): void => toGuiEventsBus$.next(createToGuiActionEvent(Inventory, true)));
  onKey(KeyCode.I).released$.subscribe((): void => toGuiEventsBus$.next(createToGuiActionEvent(Inventory, false)));
  onKey(KeyCode.M).pressed$.subscribe((): void => toGuiEventsBus$.next(createToGuiActionEvent(MiniMap, true)));
  onKey(KeyCode.M).released$.subscribe((): void => toGuiEventsBus$.next(createToGuiActionEvent(MiniMap, false)));
  // TODO DESKTOP: a bug: if pressed$ and released$ subscriptions are both present, pressed$ fires twice. Fix
  onKey(KeysExtra.Escape).pressed$.subscribe((v): void => {
    console.log('XXX0', v, true);
    return toGuiEventsBus$.next(createToGuiActionEvent(Settings, true));
  });
  onKey(KeysExtra.Escape).released$.subscribe((): void => toGuiEventsBus$.next(createToGuiActionEvent(Settings, false)));
}
