import '@/style.css';

import { setBrowserSafeguards } from '@Engine';

import { runtimeEnv } from '@/env';
import type { TAppSettings } from '@/Models/TAppSettings';
import { addNavigationPanel } from '@/Navigation/NavigationPanel';
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

// TODO DESKTOP: Implement generic platformApiService for desktop and mobile
// TODO DESKTOP: Implement save/load via platformApi
// TODO DESKTOP: debug
// console.log('XXX platformApi', window.platformApi);
// console.log('chrome', window.platformApi.chrome());
// console.log('node', window.platformApi.node());
// console.log('electron', window.platformApi.electron());
// window.platformApi.desktopAppVersion().then(console.log);

setBrowserSafeguards(window);

void route(settings).then((): void => addNavigationPanel(document.body));
