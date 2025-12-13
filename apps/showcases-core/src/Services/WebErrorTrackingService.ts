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
        release: import.meta.env.__APP_VERSION__
      },
      // TODO DESKTOP: Useful to get app's settings (resolution, locale, etc). But should not break GDPR
      // TODO DESKTOP: Implement an adapter to avoid users fingerprinting and send the settings fo Sentry. Same for Desktop.
      // TODO DESKTOP: And maybe add some "state in the game" (level, quest, etc). But we have to apply it dynamically guess, not here.
      {
        ...__BUILD_META_INFO__,
        ...(await platformApiService.getPackagesVersions()),
        platformVersion: platformApiService.getPlatformVersion(),
        node: platformApiService.getNodeVersion(),
        wrappedAppVersion: await platformApiService.getWrappedAppVersion()
      }
    );
  }

  return { start };
}
