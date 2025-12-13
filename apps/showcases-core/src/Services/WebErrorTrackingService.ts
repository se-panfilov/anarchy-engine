import type { TMetaData, TTrackingService } from '@Anarchy/Tracking';
import { BrowserTrackingService } from '@Anarchy/Tracking/Services/BrowserTrackingService';
import type { BrowserOptions } from '@sentry/browser';

import { runtimeEnv } from '@/env';
import type { TWebErrorTrackingService } from '@/Models';
import { platformApiService } from '@/Services/PlatformApiService';

export function WebErrorTrackingService(): TWebErrorTrackingService {
  async function start(): Promise<TTrackingService | undefined> {
    if (!runtimeEnv.VITE_SENTRY_DSN) return undefined;

    const options: BrowserOptions = {
      dsn: runtimeEnv.VITE_SENTRY_DSN,
      environment: __PLATFORM_MODE__,
      // Release must exact match the platform's release.
      release: await platformApiService.getReleaseName(),
      dist: await platformApiService.getDistName()
    };

    const metaData: TMetaData = {
      ...__BUILD_META_INFO__,
      ...(await platformApiService.getPackagesVersions()),
      webAppVersion: import.meta.env.__APP_VERSION__,
      platformVersion: platformApiService.getPlatformVersion(),
      node: platformApiService.getNodeVersion(),
      wrappedAppVersion: await platformApiService.getWrappedAppVersion()
    };

    // TODO DESKTOP: Anonymize this data
    // TODO DESKTOP: Do the same at the Desktop app level
    // TODO DESKTOP: And some "state of the game" (current level, quest, etc)
    const dynamicDataGetters = (): Record<string, any> => ({ settings: platformApiService.getCachedAppSettings() });

    return BrowserTrackingService(options, metaData, dynamicDataGetters);
  }

  return { start };
}
