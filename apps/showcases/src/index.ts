import '@/style.css';

import { setBrowserSafeguards } from '@Engine';

import { runtimeEnv } from '@/env';
// import { start } from '@/Levels/Showcase1MovingActors';
// import { start } from '@/Levels/Showcase2TopDown';
// import { start } from '@/Levels/Showcase3CameraFlying';
// import { start } from '@/Levels/Showcase4Fullscreen';
// import { start } from '@/Levels/Showcase5Text2d';
// import { start } from '@/Levels/Showcase6Text3d';
// import { start } from '@/Levels/Showcase7TexturesAndMaterials';
// import { start } from '@/Levels/Showcase8ComplexMaterials';
// import { start } from '@/Levels/Showcase9KeyboardAndMouse';
// import { start } from '@/Levels/Showcase10Light';
// import { start } from '@/Levels/Showcase11Fog';
// import { start } from '@/Levels/Showcase12SwitchingActiveCamera';
// import { start } from '@/Levels/Showcase13ConfigurableIntersections';
// import { start } from '@/Levels/Showcase14Distance';
// import { start } from '@/Levels/Showcase15Particles';
// import { start } from '@/Levels/Showcase16ComplexParticles';
// import { start } from '@/Levels/Showcase17Physics';
// import { start } from '@/Levels/Showcase18PhysicsSyncWithModelsTest';
// import { start } from '@/Levels/Showcase19PhysicsManualStep';
// import { start } from '@/Levels/Showcase20PhysicsShooter';
// import { start } from '@/Levels/Showcase21CustomModels';
// import { start } from '@/Levels/Showcase22ActorsWithModels';
// import { start } from '@/Levels/Showcase23TransformDrive';
// import { start } from '@/Levels/Showcase24Audio';
// import { start } from '@/Levels/Showcase25SplitScreen';
// import { start } from '@/Levels/Showcase26MultipleScenes';
import { start } from '@/Levels/Showcase27SaveLoad';
import type { TAppSettings } from '@/Models/TAppSettings';

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
console.log('XXX platformApi', window.platformApi);
window.platformApi.chrome();
window.platformApi.desktopAppVersion().then(console.log);

setBrowserSafeguards(window);

void start(settings);
