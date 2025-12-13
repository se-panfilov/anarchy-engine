import { KeyCode, KeysExtra, MouseButtonValue } from '@Anarchy/Engine';
import { isNotDefined } from '@Anarchy/Shared/Utils';
import { GuiBottomButtons } from '@Showcases/GUI/constants';
import type { TGuiButtonState, TGuiButtonStoreState } from '@Showcases/GUI/models';
import { Backpack, Map as MapIcon, Settings as SettingsIcon, Shield, Sword } from 'lucide-vue-next';
import { nanoid } from 'nanoid';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

export const useGuiButtonStore = defineStore('guiButtonsStore', () => {
  const { Attack, Map, Defense, Settings, Inventory } = GuiBottomButtons;

  const state: TGuiButtonStoreState = reactive({
    [Attack]: { id: nanoid(), isVisible: true, isActive: false, i18n: 'gui.bottom.button.attack.title', key: MouseButtonValue.Left, icon: Sword },
    [Defense]: { id: nanoid(), isVisible: true, isActive: false, i18n: 'gui.bottom.button.defense.title', key: MouseButtonValue.Right, icon: Shield },
    [Inventory]: { id: nanoid(), isVisible: true, isActive: false, i18n: 'gui.bottom.button.inventory.title', key: KeyCode.I, icon: Backpack },
    [Map]: { id: nanoid(), isVisible: true, isActive: false, i18n: 'gui.bottom.button.map.title', key: KeyCode.M, icon: MapIcon },
    [Settings]: { id: nanoid(), isVisible: true, isActive: false, i18n: 'gui.bottom.button.settings.title', key: KeysExtra.Escape, icon: SettingsIcon }
  });

  function setActiveButton(buttonName: GuiBottomButtons, isActive: boolean): void | never {
    if (isNotDefined(state[buttonName])) throw new Error(`Invalid GUI button: "${buttonName}"`);
    state[buttonName].isActive = isActive;
  }

  function setActiveButtonByKey(key: KeyCode | KeysExtra | MouseButtonValue, isActive: boolean): void {
    const buttonEntry = Object.entries(state).find(([, buttonState]): boolean => buttonState.key === key);
    if (isNotDefined(buttonEntry)) return;
    const [buttonName] = buttonEntry;
    setActiveButton(buttonName as GuiBottomButtons, isActive);
  }

  function bindButtonKey(buttonName: GuiBottomButtons, key: KeyCode | KeysExtra | MouseButtonValue): void | never {
    if (isNotDefined(state[buttonName])) throw new Error(`Invalid GUI button: "${buttonName}"`);
    state[buttonName].key = key;
  }

  function unbindButtonKey(buttonName: GuiBottomButtons): void {
    state[buttonName].key = undefined;
  }

  const buttonsList = (): ReadonlyArray<TGuiButtonState> => Object.values(state);

  return {
    state: computed((): TGuiButtonStoreState => state),
    setActiveButton,
    setActiveButtonByKey,
    bindButtonKey,
    unbindButtonKey,
    buttonsList
  };
});
