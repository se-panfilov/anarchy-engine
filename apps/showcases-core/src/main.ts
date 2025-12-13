import '@/style.scss';

import { setBrowserSafeguards } from '@Anarchy/Engine';
import { BrowserTrackingService } from '@Anarchy/Tracking';

import { runtimeEnv } from '@/env';
import type { TAppSettings } from '@/Models/TAppSettings';
import { addNavigationPanel } from '@/Navigation';
import { route } from '@/router';

const settings: TAppSettings = {
  loopsDebugInfo: runtimeEnv.VITE_APP_SHOW_DEBUG_INFO,
  spaceSettings: {
    // threeJsSettings: {
    //   draco: {
    //     dracoLoaderDecoderPath: runtimeEnv.VITE_APP_DRACO_DECODER_PATH
    //   }
    // }
  }
};

//Enable error tracking
BrowserTrackingService(
  {
    dsn: runtimeEnv.VITE_SENTRY_DSN,
    environment: __PLATFORM_MODE__,
    release: import.meta.env.__APP_VERSION__
  },
  __BUILD_META_INFO__
);

// TODO DESKTOP: DEBUG ERROR
(window as any).myUndefinedFunction();

// TODO MOBILE: Detect user locale in mobile app and send it to the app settings (menu)

setBrowserSafeguards(window);

void route(settings).then((): void => {
  if (runtimeEnv.VITE_APP_SHOW_DEV_NAV) addNavigationPanel(document.body);
});
