import type { TShowcaseGameSettings } from '@Showcases/Shared';
import type { BrowserWindow } from 'electron';

export function windowReadyToShow(win: BrowserWindow, settings: TShowcaseGameSettings): void {
  win.webContents.on('will-navigate', (): void => {
    console.log(`[Desktop Main]: window is ready to show`);
    win.show();
    applyFullscreen(win, settings);
  });
}

function applyFullscreen(win: BrowserWindow, settings: TShowcaseGameSettings): void {
  if (settings.graphics.isFullScreen) {
    if (process.platform === 'darwin') {
      win.setSimpleFullScreen(true);
    } else {
      win.setFullScreen(true);
    }
  }
}
