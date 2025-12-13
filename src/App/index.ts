import '@/App/style.css';

// import { showcase } from '@/App/Levels/Showcase1MovingActors';
// import { showcase } from '@/App/Levels/Showcase2TopDown';
// import { showcase } from '@/App/Levels/Showcase3CameraFlying';
// TODO 10.0.0. LOOPS: fix
// import { showcase } from '@/App/Levels/Showcase4AnimejsSimple';
// import { showcase } from '@/App/Levels/Showcase5AnimejsComplex';
// import { showcase } from '@/App/Levels/Showcase6Fullscreen';
// import { showcase } from '@/App/Levels/Showcase7Text2d';
// import { showcase } from '@/App/Levels/Showcase8Text3d';
// import { showcase } from '@/App/Levels/Showcase9TexturesAndMaterials';
// import { showcase } from '@/App/Levels/Showcase10ComplexMaterials';
// TODO 10.0.0. LOOPS: fix
// import { showcase } from '@/App/Levels/Showcase11KeyboardAndMouse';
// import { showcase } from '@/App/Levels/Showcase12Light';
// import { showcase } from '@/App/Levels/Showcase13Fog';
// import { showcase } from '@/App/Levels/Showcase14SwitchingActiveCamera';
// import { showcase } from '@/App/Levels/Showcase15ConfigurableIntersections';
// TODO 10.0.0. LOOPS: fix
// import { showcase } from '@/App/Levels/Showcase16Distance';
// import { showcase } from '@/App/Levels/Showcase17Particles';
// import { showcase } from '@/App/Levels/Showcase18ComplexParticles';
// import { showcase } from '@/App/Levels/Showcase19Physics';
// TODO 10.0.0. LOOPS: fix
// import { showcase } from '@/App/Levels/Showcase20PhysicsSyncWithModelsTest';
// TODO 10.0.0. LOOPS: fix manual step
// import { showcase } from '@/App/Levels/Showcase21PhysicsManualStep';
// TODO 10.0.0. LOOPS: fix manual step
// TODO 10.0.0. LOOPS: fix fps counter
import { showcase } from '@/App/Levels/Showcase22PhysicsShooter';
// import { showcase } from '@/App/Levels/Showcase23CustomModels';
// import { showcase } from '@/App/Levels/Showcase24ActorsWithModels';
// import { showcase } from '@/App/Levels/Showcase25TransformDrive';
import type { TAppCanvas } from '@/Engine';
import { ambientContext, isNotDefined } from '@/Engine';

const canvas: TAppCanvas | null = ambientContext.container.getCanvasElement('#app');
if (isNotDefined(canvas)) throw new Error('Canvas is not defined');
const { start } = await showcase(canvas);
void start();
