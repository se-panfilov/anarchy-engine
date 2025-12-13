import type { TTrackingService } from '@Anarchy/Tracking';
import { BrowserTrackingService } from '@Anarchy/Tracking/Services/BrowserTrackingService';

import { runtimeEnv } from '@/env';
import type { TWebErrorTrackingService } from '@/Models';
import { platformApiService } from '@/Services/PlatformApiService';

export function WebErrorTrackingService(): TWebErrorTrackingService {
  async function start(): Promise<TTrackingService | undefined> {
    if (!runtimeEnv.VITE_SENTRY_DSN) return undefined;

    return BrowserTrackingService(
      {
        dsn: runtimeEnv.VITE_SENTRY_DSN,
        environment: __PLATFORM_MODE__,
        // Release must exact match the platform's release.
        release: await platformApiService.getReleaseName(),
        dist: await platformApiService.getDistName()
      },
      // TODO DESKTOP: Useful to get app's settings (resolution, locale, etc). But should not break GDPR
      // TODO DESKTOP: And maybe add some "state in the game" (level, quest, etc). But we have to apply it dynamically guess, not here.
      {
        ...__BUILD_META_INFO__,
        ...(await platformApiService.getPackagesVersions()),
        webAppVersion: import.meta.env.__APP_VERSION__,
        platformVersion: platformApiService.getPlatformVersion(),
        node: platformApiService.getNodeVersion(),
        wrappedAppVersion: await platformApiService.getWrappedAppVersion()
      }
    );
  }

  return { start };
}
