import type { BrowserWindow } from 'electron';
import { Menu } from 'electron';

export function turnOffMenuBarAndHotkeys(): void {
  // Turn off the menu bar (and Hotkeys(!!!) such as Ctrl+R, Ctrl+F5, etc.)
  const emptyMenu: Menu = Menu.buildFromTemplate([]);
  Menu.setApplicationMenu(emptyMenu);
}

export function hideMenuBar(win: BrowserWindow): void {
  win.setMenuBarVisibility(false);
}

export function noZoom(win: BrowserWindow): void {
  win.webContents.setVisualZoomLevelLimits(1, 1).catch((err: any): void => {
    console.log('[DESKTOP]: Error setting zoom level limits:');
    // TODO DESKTOP: can we log to the file?
    console.error(err);
  });
}
