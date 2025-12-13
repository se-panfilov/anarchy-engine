import type { BrowserWindow, Event, WebContentsWillNavigateEventParams } from 'electron';

export function windowNavigateHandler(win: BrowserWindow): void {
  win.webContents.on('will-navigate', (event: Event<WebContentsWillNavigateEventParams>, url: string): void => {
    console.log(`[DESKTOP]: navigation to ${event.url} `);

    // TODO DESKTOP: Make this configurable
    // event.preventDefault(); // Prevent navigation to other pages

    // Prevent drag and drop navigation
    if (url !== win.webContents.getURL()) {
      event.preventDefault();
      console.log(`[DESKTOP]: navigation by drag and drop prevented`);
    }
  });
}
