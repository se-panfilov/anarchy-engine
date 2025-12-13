import '@/style.scss';

import { setBrowserSafeguards } from '@Anarchy/Engine';

import { runtimeEnv } from '@/env';
import type { TAppSettings } from '@/Models/TAppSettings';
import { addNavigationPanel } from '@/Navigation';
import { route } from '@/router';
import { WebErrorTrackingService } from '@/Services';

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

// TODO MOBILE: Integrate Sentry for mobile app error tracking

//Allow tracking for all productions (web, desktop, mobile)
if (__PLATFORM_MODE__.startsWith('production')) await WebErrorTrackingService().start();

// TODO MOBILE: Detect user locale in mobile app and send it to the app settings (menu)

setBrowserSafeguards(window);

void route(settings).then((): void => {
  if (runtimeEnv.VITE_APP_SHOW_DEV_NAV) addNavigationPanel(document.body);
});
