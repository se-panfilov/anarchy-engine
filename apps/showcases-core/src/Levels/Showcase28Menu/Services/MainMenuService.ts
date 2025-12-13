import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { TLegalDoc, TLoadDocPayload, TShowcaseGameSettings } from '@Showcases/Shared';

import type { TMainMenuService } from '@/Levels/Showcase28Menu/Models';
import { platformApiService } from '@/Services';

export function MainMenuService(menuSelector: string = '#menu'): TMainMenuService {
  function isMenuActive(): boolean {
    const mainMenuElement: HTMLElement | null = document.querySelector(menuSelector);
    if (isNotDefined(mainMenuElement)) throw new Error(`[APP] No main menu element found`);
    return mainMenuElement.classList.contains('-active');
  }

  function openMainMenu(): void | never {
    const mainMenuElement: HTMLElement | null = document.querySelector(menuSelector);
    if (isNotDefined(mainMenuElement)) throw new Error(`[APP] No main menu element found`);
    mainMenuElement.classList.add('-active');
  }

  function closeMainMenu(): void | never {
    const mainMenuElement: HTMLElement | null = document.querySelector(menuSelector);
    if (isNotDefined(mainMenuElement)) throw new Error(`[APP] No main menu element found`);
    mainMenuElement.classList.remove('-active');
  }

  async function setSettings(settings: TShowcaseGameSettings): Promise<void> {
    return platformApiService.setAppSettings(settings);
  }

  const closeApp = (): void => platformApiService.closeApp();
  const restartApp = (): void => platformApiService.restartApp();
  const getSettings = async (): Promise<TShowcaseGameSettings> => platformApiService.getAppSettings();
  const getLegalDocs = async (options: TLoadDocPayload): Promise<TLegalDoc> => platformApiService.getLegalDocs(options);

  return {
    closeApp,
    closeMainMenu,
    getLegalDocs,
    getSettings,
    isMenuActive,
    openMainMenu,
    restartApp,
    setSettings
  };
}
