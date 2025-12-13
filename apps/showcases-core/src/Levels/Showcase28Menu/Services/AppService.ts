import type { TAppService } from '@/Levels/Showcase28Menu/Models';
import { platformApiService } from '@/Services';

export function AppService(): TAppService {
  return {
    closeApp(): void {
      platformApiService.closeApp();
    },
    restartApp(args?: ReadonlyArray<string>): void {
      platformApiService.restartApp(args);
    }
  };
}
