import type { KeyCode, MouseButtonValue } from '@Anarchy/Engine';
import { isNotDefined } from '@Anarchy/Shared/Utils';
import { GuiBottomButtons } from '@Showcases/GUI/constants';
import type { TGuiButtonState, TGuiButtonStoreState } from '@Showcases/GUI/models';
import { vueTranslationService } from '@Showcases/i18n';
import { nanoid } from 'nanoid';
import { defineStore } from 'pinia';
import type { ShallowRef } from 'vue';
import { computed, reactive } from 'vue';

export const useGuiButtonStore = defineStore('guiButtonsStore', () => {
  const { Attack, Map, Defense, Settings, Inventory } = GuiBottomButtons;

  const attackTitle: ShallowRef<string> = vueTranslationService.$t('gui.bottom.button.attack.title');

  const state: TGuiButtonStoreState = reactive({
    [Attack]: { id: nanoid(), isVisible: true, isActive: true, title: attackTitle.value, key: undefined },
    [Defense]: { id: nanoid(), isVisible: true, isActive: true, title: vueTranslationService.$t('gui.bottom.button.defense.title').value, key: undefined },
    [Inventory]: { id: nanoid(), isVisible: true, isActive: true, title: vueTranslationService.$t('gui.bottom.button.attack.title').value, key: undefined },
    [Map]: { id: nanoid(), isVisible: true, isActive: true, title: vueTranslationService.$t('gui.bottom.button.attack.title').value, key: undefined },
    [Settings]: { id: nanoid(), isVisible: true, isActive: true, title: vueTranslationService.$t('gui.bottom.button.attack.title').value, key: undefined }
  });

  vueTranslationService.locale$.subscribe((locale) => {
    console.log('XXX changed', attackTitle.value);
    console.log('XXX 222', vueTranslationService.translate('gui.bottom.button.attack.title'));
  });

  function setActiveButton(buttonName: GuiBottomButtons, isActive: boolean): void | never {
    if (isNotDefined(state[buttonName])) throw new Error(`Invalid GUI button: "${buttonName}"`);
    state[buttonName].isActive = isActive;
  }

  function setActiveButtonByKey(key: KeyCode | MouseButtonValue, isActive: boolean): void | never {
    const buttonEntry = Object.entries(state).find(([, buttonState]) => buttonState.key === key);
    if (isNotDefined(buttonEntry)) throw new Error(`[GuiButtonsStore]: Can't set active button: button for key "${key}" is not found`);
    const [buttonName] = buttonEntry;
    setActiveButton(buttonName as GuiBottomButtons, isActive);
  }

  function bindButtonKey(buttonName: GuiBottomButtons, key: KeyCode | MouseButtonValue): void | never {
    if (isNotDefined(state[buttonName])) throw new Error(`Invalid GUI button: "${buttonName}"`);
    state[buttonName].key = key;
  }

  function unbindButtonKey(buttonName: GuiBottomButtons): void {
    state[buttonName].key = undefined;
  }

  const buttonsList = (): ReadonlyArray<TGuiButtonState> => Object.values(state);

  return {
    state: computed(() => state),
    setActiveButton,
    setActiveButtonByKey,
    bindButtonKey,
    unbindButtonKey,
    buttonsList
  };
});
