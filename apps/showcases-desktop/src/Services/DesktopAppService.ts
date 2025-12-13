import type { TDesktopAppService } from '@Showcases/Desktop/Models';

export function DesktopAppService(): TDesktopAppService {
  return {
    restartApp(): void {
      // TODO DESKTOP: Implement restart app
      console.log('[DESKTOP]: Restarting app (not implemented)');
    },
    closeApp(): void {
      // TODO DESKTOP: Implement close app
      console.log('[DESKTOP]: Close app (not implemented)');
    }
  };
}
