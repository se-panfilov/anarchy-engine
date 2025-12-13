import type { TKeyboardService, TMouseService } from '@Anarchy/Engine';
import { KeyCode } from '@Anarchy/Engine';
import { isEventKey } from '@Anarchy/Engine/Keyboard/Utils/KeysUtils';
import type { TToGuiEvent } from '@Showcases/Shared';
import type { Subject } from 'rxjs';
import { GuiActionType } from 'showcases-gui/src/constants';
import { createToGuiActionEvent } from 'showcases-gui/src/events';

export function initGuiEvents(keyboardService: TKeyboardService, mouseService: TMouseService, toGuiEventsBus$: Subject<TToGuiEvent>): void {
  const { clickLeftRelease$, clickLeftPress$, clickRightPress$, clickRightRelease$ } = mouseService;
  const { pressed$, released$ } = keyboardService;

  const { Attack, Defense, MiniMap, Inventory, Settings } = GuiActionType;

  clickLeftPress$.subscribe((): void => toGuiEventsBus$.next(createToGuiActionEvent(Attack, true)));
  clickLeftRelease$.subscribe((): void => toGuiEventsBus$.next(createToGuiActionEvent(Attack, false)));

  clickRightPress$.subscribe((): void => toGuiEventsBus$.next(createToGuiActionEvent(Defense, true)));
  clickRightRelease$.subscribe((): void => toGuiEventsBus$.next(createToGuiActionEvent(Defense, false)));

  const openInventory = (open: boolean): void => toGuiEventsBus$.next(createToGuiActionEvent(Inventory, open));
  const openSettings = (open: boolean): void => toGuiEventsBus$.next(createToGuiActionEvent(Settings, open));
  const openMiniMap = (open: boolean): void => toGuiEventsBus$.next(createToGuiActionEvent(MiniMap, open));

  pressed$.subscribe((event: KeyboardEvent): void => {
    if (isEventKey(KeyCode.I, event)) openInventory(true);
    if (isEventKey(KeyCode.M, event)) openMiniMap(true);
    if (isEventKey(KeyCode.Escape, event)) openSettings(true);
  });

  released$.subscribe((event: KeyboardEvent): void => {
    if (isEventKey(KeyCode.I, event)) openInventory(false);
    if (isEventKey(KeyCode.M, event)) openMiniMap(false);
    if (isEventKey(KeyCode.Escape, event)) openSettings(false);
  });
}
