import { isNotDefined } from '@Engine';

export function openMainMenu(): void | never {
  const mainMenuElement: HTMLElement | null = document.querySelector('#menu');
  if (isNotDefined(mainMenuElement)) throw new Error(`[Showcase]: No main menu element found`);

  mainMenuElement.classList.add('-active');
}
