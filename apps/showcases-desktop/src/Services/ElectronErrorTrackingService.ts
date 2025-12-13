import type { TTrackingService } from '@Anarchy/Tracking';
import { DesktopTrackingService } from '@Anarchy/Tracking';
import type { TElectronErrorTrackingService } from '@Showcases/Desktop/Models';

export function ElectronErrorTrackingService(): TElectronErrorTrackingService {
  function start(): TTrackingService | undefined {
    return DesktopTrackingService(
      {
        dsn: runtimeEnv.SENTRY_DSN,
        environment: __PLATFORM_MODE__,
        release: import.meta.env.__APP_VERSION__
      },
      __BUILD_META_INFO__
    );
  }

  return { start };
}
