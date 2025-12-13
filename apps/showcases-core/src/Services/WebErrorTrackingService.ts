import { isDefined } from '@Anarchy/Shared/Utils';
import type { TMetaData, TTrackingService } from '@Anarchy/Tracking';
import { BrowserTrackingService } from '@Anarchy/Tracking/Services/BrowserTrackingService';
import type { BrowserOptions } from '@sentry/browser';
import type { TShowcaseAnonymizedGameSettings } from '@Showcases/Shared';
import { getAnonymizedSettings } from '@Showcases/Shared';

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
      // TODO DESKTOP: add here lang (two letters, e.g. "en") and some other short info
    };

    // TODO DESKTOP: Do the same at the Desktop app level
    const dynamicDataGetters = (): Record<string, any> => ({
      settings: (): TShowcaseAnonymizedGameSettings => {
        const settings = platformApiService.getCachedAppSettings();
        return isDefined(settings) ? getAnonymizedSettings(settings) : {};
      }
      // TODO DESKTOP: And some "state of the game" (current level, quest, etc)
      // game: ...
    });

    return BrowserTrackingService(options, metaData, dynamicDataGetters);
  }

  return { start };
}
