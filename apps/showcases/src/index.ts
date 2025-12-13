import '@/style.css';

import type { TSpaceFlags } from '@Engine';

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
import { start } from '@/Levels/Showcase21CustomModels';
// import { start } from '@/Levels/Showcase22ActorsWithModels';
// import { start } from '@/Levels/Showcase23TransformDrive';
// import { start } from '@/Levels/Showcase24Audio';
// import { start } from '@/Levels/Showcase25SplitScreen';
// import { start } from '@/Levels/Showcase26MultipleScenes';
// import { start } from '@/Levels/Showcase27SaveLoad';

const flags: TSpaceFlags = {
  loopsDebugInfo: runtimeEnv.VITE_SHOW_DEBUG_INFO
};

void start(flags);
