import type { TWindowService } from '@Showcases/Desktop/Models';
import type { TShowcasesGameSettings } from '@Showcases/Shared';
import type { BrowserWindow } from 'electron';

export function windowReadyToShow(win: BrowserWindow, settings: TShowcasesGameSettings, windowService: TWindowService): void {
  win.once('ready-to-show', (): void => {
    console.log(`[DESKTOP] App's window is ready`);
    win.show();
    applyFullscreen(settings, windowService);
  });
}

function applyFullscreen(settings: TShowcasesGameSettings, windowService: TWindowService): void {
  if (settings.graphics.isFullScreen) {
    console.log(`[DESKTOP] Starting fullscreen mode`);
    windowService.setFullScreen(true);
  }
}
