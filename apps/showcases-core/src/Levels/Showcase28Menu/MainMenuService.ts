import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { TLegalDoc, TLoadDocPayload, TShowcaseGameSettings } from '@Showcases/Shared';

import { platformApiService } from '@/Services';

export function openMainMenu(): void | never {
  const mainMenuElement: HTMLElement | null = document.querySelector('#menu');
  if (isNotDefined(mainMenuElement)) throw new Error(`[Showcase]: No main menu element found`);
  mainMenuElement.classList.add('-active');
}

export function closeMainMenu(): void | never {
  const mainMenuElement: HTMLElement | null = document.querySelector('#menu');
  if (isNotDefined(mainMenuElement)) throw new Error(`[Showcase]: No main menu element found`);
  mainMenuElement.classList.remove('-active');
}

export async function saveSettings(settings: TShowcaseGameSettings): Promise<void> {
  return platformApiService.saveAppSettings(settings);
}

export const loadSettings = async (): Promise<TShowcaseGameSettings> => platformApiService.loadAppSettings();
export const loadLegalDocs = async (options: TLoadDocPayload): Promise<TLegalDoc> => platformApiService.loadLegalDocs(options);
