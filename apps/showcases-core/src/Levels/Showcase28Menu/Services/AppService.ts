import type { TAppService } from '@/Levels/Showcase28Menu/Models';

export function AppService(): TAppService {
  return {
    restartApp(): void {
      // TODO DESKTOP: Implement restart app (platform independent, use platform service)
      console.log('[APP]: Restarting app (not implemented)');
    },
    closeApp(): void {
      // TODO DESKTOP: Implement close app (platform independent, use platform service). Not available on web
      console.log('[APP]: Close app (not implemented)');
    }
  };
}
