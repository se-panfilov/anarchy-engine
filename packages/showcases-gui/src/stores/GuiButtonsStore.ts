import type { MouseButtonValue, TGameKey } from '@Anarchy/Engine';
import { isNotDefined } from '@Anarchy/Shared/Utils';
import { BUTTON_IDS, BUTTON_KEYS, GuiActionType } from '@Showcases/GUI/constants';
import type { TGuiButtonState, TGuiButtonStoreState } from '@Showcases/GUI/models';
import { Backpack, Map as MapIcon, Settings as SettingsIcon, Shield, Sword } from 'lucide-vue-next';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

const { Attack, Map, Defense, Settings, Inventory } = GuiActionType;

export const useGuiButtonStore = defineStore('guiButtonsStore', () => {
  const state: TGuiButtonStoreState = reactive({
    [Attack]: { id: BUTTON_IDS[Attack], isVisible: true, isActive: false, i18n: 'gui.bottom.button.attack.title', key: BUTTON_KEYS[Attack], icon: Sword },
    [Defense]: { id: BUTTON_IDS[Defense], isVisible: true, isActive: false, i18n: 'gui.bottom.button.defense.title', key: BUTTON_KEYS[Defense], icon: Shield },
    [Inventory]: { id: BUTTON_IDS[Inventory], isVisible: true, isActive: false, i18n: 'gui.bottom.button.inventory.title', key: BUTTON_KEYS[Inventory], icon: Backpack },
    [Map]: { id: BUTTON_IDS[Map], isVisible: true, isActive: false, i18n: 'gui.bottom.button.map.title', key: BUTTON_KEYS[Map], icon: MapIcon },
    [Settings]: { id: BUTTON_IDS[Settings], isVisible: true, isActive: false, i18n: 'gui.bottom.button.settings.title', key: BUTTON_KEYS[Settings], icon: SettingsIcon }
  });

  function setActiveButton(actionType: GuiActionType, isActive: boolean): void | never {
    if (isNotDefined(state[actionType])) throw new Error(`Invalid GUI button: "${actionType}"`);
    state[actionType].isActive = isActive;
  }

  function setActiveButtonByKey(key: TGameKey | MouseButtonValue, isActive: boolean): void | never {
    const buttonEntry = Object.entries(state).find(([, buttonState]): boolean => buttonState.key === key);
    if (isNotDefined(buttonEntry)) throw new Error(`[GuiButtonsStore]: Can't set active button: button for key "${key}" is not found`);
    const [buttonName] = buttonEntry;
    setActiveButton(buttonName as GuiActionType, isActive);
  }

  function bindButtonKey(buttonName: GuiActionType, key: TGameKey | MouseButtonValue): void | never {
    if (isNotDefined(state[buttonName])) throw new Error(`Invalid GUI button: "${buttonName}"`);
    state[buttonName].key = key;
  }

  function unbindButtonKey(buttonName: GuiActionType): void {
    state[buttonName].key = undefined;
  }

  const buttonsList = computed((): ReadonlyArray<TGuiButtonState> => Object.values(state));

  return {
    state: computed((): TGuiButtonStoreState => state),
    setActiveButton,
    setActiveButtonByKey,
    bindButtonKey,
    unbindButtonKey,
    buttonsList
  };
});
