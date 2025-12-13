import { isNotDefined } from '@Anarchy/Shared/Utils';

import type { TGuiService } from '@/Levels/Showcase28Menu/Models';

export function GuiService(): TGuiService {
  function openGui(): void | never {
    const guiElement: HTMLElement | null = document.querySelector('#gui');
    if (isNotDefined(guiElement)) throw new Error(`[APP] No gui element found`);
    guiElement.classList.add('-active');
  }

  function closeGui(): void | never {
    const guiElement: HTMLElement | null = document.querySelector('#gui');
    if (isNotDefined(guiElement)) throw new Error(`[APP] No gui element found`);
    guiElement.classList.remove('-active');
  }

  return {
    closeGui,
    openGui
  };
}
