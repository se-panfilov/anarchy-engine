import type { TTrackingService } from '@Anarchy/Tracking';
import { BrowserTrackingService } from '@Anarchy/Tracking/Services/BrowserTrackingService';

import { runtimeEnv } from '@/env';
import type { TWebErrorTrackingService } from '@/Models';
import { platformApiService } from '@/Services/PlatformApiService';

export function WebErrorTrackingService(): TWebErrorTrackingService {
  async function start(): Promise<TTrackingService> {
    return BrowserTrackingService(
      {
        dsn: runtimeEnv.VITE_SENTRY_DSN,
        environment: __PLATFORM_MODE__,
        release: import.meta.env.__APP_VERSION__
      },
      // TODO DESKTOP: Useful to get app's settings (resolution, locale, etc). But should not break GDPR
      // TODO DESKTOP: Implement an adapter to avoid users fingerprinting and send the settings fo Sentry. Same for Desktop.
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
