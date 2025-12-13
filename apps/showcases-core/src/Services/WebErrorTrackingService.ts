import type { TTrackingService } from '@Anarchy/Tracking';
import { BrowserTrackingService } from '@Anarchy/Tracking';

import { runtimeEnv } from '@/env';
import type { TWebErrorTrackingService } from '@/Models';

export function WebErrorTrackingService(): TWebErrorTrackingService {
  function start(): TTrackingService | undefined {
    // Only for production web builds
    if (__PLATFORM_MODE__ !== 'production.web') return undefined;

    return BrowserTrackingService(
      {
        dsn: runtimeEnv.VITE_SENTRY_DSN,
        environment: __PLATFORM_MODE__,
        release: import.meta.env.__APP_VERSION__
      },
      __BUILD_META_INFO__
    );
  }

  return { start };
}
