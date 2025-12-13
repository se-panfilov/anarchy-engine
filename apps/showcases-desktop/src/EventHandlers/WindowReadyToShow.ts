import type { TWindowService } from '@Showcases/Desktop/Models';
import type { TShowcaseGameSettings } from '@Showcases/Shared';
import type { BrowserWindow } from 'electron';

export function windowReadyToShow(win: BrowserWindow, settings: TShowcaseGameSettings, windowService: TWindowService): void {
  win.once('ready-to-show', (): void => {
    console.log(`[DESKTOP] App's window is ready`);
    win.show();
    applyFullscreen(settings, windowService);
  });
}

function applyFullscreen(settings: TShowcaseGameSettings, windowService: TWindowService): void {
  if (settings.graphics.isFullScreen) {
    console.log(`[DESKTOP] Starting fullscreen mode`);
    windowService.setFullScreen(true);
  }
}
