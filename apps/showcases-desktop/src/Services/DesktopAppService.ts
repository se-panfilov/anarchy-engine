import type { TDesktopAppService } from '@Showcases/Desktop/Models';

export function DesktopAppService(): TDesktopAppService {
  return {
    restartApp(): void {
      // TODO DESKTOP: Implement restart app
      console.log('[DESKTOP]: (NOT IMPLEMENTED) Restarting app');
    },
    closeApp(): void {
      // TODO DESKTOP: Implement close app
      console.log('[DESKTOP]: (NOT IMPLEMENTED) Close app');
    }
  };
}
