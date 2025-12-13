import type { TKeyboardService, TKeyEvent, TMouseService } from '@Anarchy/Engine';
import { hasKey, isPressEvent, KeyCode } from '@Anarchy/Engine';
import { isKeyInEvent } from '@Anarchy/Engine/Keyboard/Utils/KeysUtils';
import type { TToGuiEvent } from '@Showcases/Shared';
import type { Subject } from 'rxjs';
import { GuiActionType } from 'showcases-gui/src/constants';
import { createToGuiActionEvent } from 'showcases-gui/src/events';

export function initGuiEvents(keyboardService: TKeyboardService, mouseService: TMouseService, toGuiEventsBus$: Subject<TToGuiEvent>): void {
  const { clickLeftRelease$, clickLeftPress$, clickRightPress$, clickRightRelease$ } = mouseService;
  const { keys$ } = keyboardService;

  const { Attack, Defense, MiniMap, Inventory, Settings, Language } = GuiActionType;

  clickLeftPress$.subscribe((): void => toGuiEventsBus$.next(createToGuiActionEvent(Attack, true)));
  clickLeftRelease$.subscribe((): void => toGuiEventsBus$.next(createToGuiActionEvent(Attack, false)));

  clickRightPress$.subscribe((): void => toGuiEventsBus$.next(createToGuiActionEvent(Defense, true)));
  clickRightRelease$.subscribe((): void => toGuiEventsBus$.next(createToGuiActionEvent(Defense, false)));

  const openInventory = (open: boolean): void => toGuiEventsBus$.next(createToGuiActionEvent(Inventory, open));
  const openSettings = (open: boolean): void => toGuiEventsBus$.next(createToGuiActionEvent(Settings, open));
  const openMiniMap = (open: boolean): void => toGuiEventsBus$.next(createToGuiActionEvent(MiniMap, open));
  const toggleLang = (): void => void toGuiEventsBus$.next(createToGuiActionEvent(Language, true));

  keys$.subscribe((keyEvent: TKeyEvent): void => {
    if (isKeyInEvent(KeyCode.I, keyEvent)) openInventory(isPressEvent(keyEvent));
    if (isKeyInEvent(KeyCode.M, keyEvent)) openMiniMap(isPressEvent(keyEvent));
    if (hasKey(KeyCode.L, keyEvent.keys)) toggleLang();
    if (isKeyInEvent(KeyCode.Escape, keyEvent)) openSettings(isPressEvent(keyEvent));
  });
}
