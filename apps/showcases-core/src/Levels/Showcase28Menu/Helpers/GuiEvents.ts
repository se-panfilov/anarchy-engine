import type { TKeyboardService, TKeysEvent, TMouseService } from '@Anarchy/Engine';
import { isPressEvent, KeyCode } from '@Anarchy/Engine';
import { isKeyInEvent } from '@Anarchy/Engine/Keyboard/Utils/KeysUtils';
import type { TToGuiEvent } from '@Showcases/Shared';
import type { Subject } from 'rxjs';
import { GuiActionType } from 'showcases-gui/src/constants';
import { createToGuiActionEvent } from 'showcases-gui/src/events';

export function initGuiEvents(keyboardService: TKeyboardService, mouseService: TMouseService, toGuiEventsBus$: Subject<TToGuiEvent>): void {
  const { clickLeftRelease$, clickLeftPress$, clickRightPress$, clickRightRelease$ } = mouseService;
  const { keys$ } = keyboardService;

  const { Attack, Defense, MiniMap, Inventory, Settings } = GuiActionType;

  clickLeftPress$.subscribe((): void => toGuiEventsBus$.next(createToGuiActionEvent(Attack, true)));
  clickLeftRelease$.subscribe((): void => toGuiEventsBus$.next(createToGuiActionEvent(Attack, false)));

  clickRightPress$.subscribe((): void => toGuiEventsBus$.next(createToGuiActionEvent(Defense, true)));
  clickRightRelease$.subscribe((): void => toGuiEventsBus$.next(createToGuiActionEvent(Defense, false)));

  const openInventory = (open: boolean): void => toGuiEventsBus$.next(createToGuiActionEvent(Inventory, open));
  const openSettings = (open: boolean): void => toGuiEventsBus$.next(createToGuiActionEvent(Settings, open));
  const openMiniMap = (open: boolean): void => toGuiEventsBus$.next(createToGuiActionEvent(MiniMap, open));

  keys$.subscribe((event: TKeysEvent): void => {
    if (isKeyInEvent(KeyCode.I, event)) openInventory(isPressEvent(event));
    if (isKeyInEvent(KeyCode.M, event)) openMiniMap(isPressEvent(event));
    if (isKeyInEvent(KeyCode.Escape, event)) openSettings(isPressEvent(event));
  });
}
