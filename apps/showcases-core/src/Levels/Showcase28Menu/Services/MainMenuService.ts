import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { TLegalDoc, TLoadDocPayload, TShowcaseGameSettings } from '@Showcases/Shared';

import type { TMainMenuService } from '@/Levels/Showcase28Menu/Models';
import { platformApiService } from '@/Services';

export function MainMenuService(): TMainMenuService {
  function openMainMenu(): void | never {
    const mainMenuElement: HTMLElement | null = document.querySelector('#menu');
    if (isNotDefined(mainMenuElement)) throw new Error(`[APP] No main menu element found`);
    mainMenuElement.classList.add('-active');
  }

  function closeMainMenu(): void | never {
    const mainMenuElement: HTMLElement | null = document.querySelector('#menu');
    if (isNotDefined(mainMenuElement)) throw new Error(`[APP] No main menu element found`);
    mainMenuElement.classList.remove('-active');
  }

  async function writeSettings(settings: TShowcaseGameSettings): Promise<void> {
    return platformApiService.writeAppSettings(settings);
  }

  const closeApp = (): void => platformApiService.closeApp();
  const restartApp = (): void => platformApiService.restartApp();
  const readSettings = async (): Promise<TShowcaseGameSettings> => platformApiService.readAppSettings();
  const loadLegalDocs = async (options: TLoadDocPayload): Promise<TLegalDoc> => platformApiService.loadLegalDocs(options);

  return {
    openMainMenu,
    closeMainMenu,
    writeSettings,
    closeApp,
    restartApp,
    readSettings,
    loadLegalDocs
  };
}
