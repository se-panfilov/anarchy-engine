import type { TShowcaseGameSettings } from '@Showcases/Shared';
import type { BrowserWindow } from 'electron';

export function windowReadyToShow(win: BrowserWindow, settings: TShowcaseGameSettings): void {
  win.once('ready-to-show', (): void => {
    console.log(`[Desktop] App's window is ready`);
    win.show();
    applyFullscreen(win, settings);
  });
}

function applyFullscreen(win: BrowserWindow, settings: TShowcaseGameSettings): void {
  if (settings.graphics.isFullScreen) {
    console.log(`[Desktop] Starting fullscreen mode`);
    if (process.platform === 'darwin') {
      win.setSimpleFullScreen(true);
    } else {
      win.setFullScreen(true);
    }
  }
}
