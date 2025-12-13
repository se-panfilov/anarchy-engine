import { isNotDefined } from '@Engine';
import type { TGameSettings } from '@ShowcasesShared';

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

export async function saveSettings(settings: TGameSettings): Promise<void> {
  return platformApiService.saveAppSettings(settings);
}

export async function loadSettings(): Promise<TGameSettings> {
  return platformApiService.loadAppSettings();
}
