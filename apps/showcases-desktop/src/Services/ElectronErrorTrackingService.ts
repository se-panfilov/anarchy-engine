import type { TTrackingService } from '@Anarchy/Tracking';
import { DesktopTrackingService } from '@Anarchy/Tracking';
import type { TElectronErrorTrackingService } from '@Showcases/Desktop/Models';

export function ElectronErrorTrackingService(): TElectronErrorTrackingService {
  function start(packagesVersions: Record<string, string>): TTrackingService | undefined {
    if (!import.meta.env.VITE_SENTRY_DSN) return undefined;

    return DesktopTrackingService(
      {
        dsn: import.meta.env.VITE_SENTRY_DSN,
        environment: __PLATFORM_MODE__,
        release: __DESKTOP_APP_VERSION__
      },
      {
        ...packagesVersions,
        desktop: __DESKTOP_APP_VERSION__,
        platformVersion: process.versions.electron,
        node: process.versions.node,
        wrappedAppVersion: __DESKTOP_APP_VERSION__
      }
    );
  }

  return { start };
}
