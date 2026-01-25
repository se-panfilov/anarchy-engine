import type { TLocaleId } from '@Anarchy/i18n';
import { getLangFromLocaleId } from '@Anarchy/i18n';
import { isDefined } from '@Anarchy/Shared/Utils';
import type { TMetaData, TTrackingService } from '@Anarchy/Tracking';
import { BrowserTrackingService } from '@Anarchy/Tracking/Services/BrowserTrackingService';
import type { BrowserOptions } from '@sentry/browser';
import type { TShowcasesGameSettings } from '@Showcases/Shared';
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
    };

    const dynamicContext = (): Record<string, any> => {
      const settings: TShowcasesGameSettings | undefined = platformApiService.getCachedAppSettings();

      return {
        settings: isDefined(settings) ? getAnonymizedSettings(settings) : undefined
        // TODO RELEASE: And some "state of the game" (current level, quest, etc)
        // game: ...
      };
    };

    const dynamicTags = (): Record<string, number | string | boolean | bigint | symbol | null | undefined> => ({
      lang: getLangFromLocaleId(platformApiService.getCachedAppSettings()?.localization.locale.id ?? ('??' as TLocaleId))
    });

    return BrowserTrackingService(options, metaData, dynamicContext, dynamicTags);
  }

  return { start };
}
