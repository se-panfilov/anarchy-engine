import '@/App/style.css';

// import { showcase } from '@/App/Levels/Showcase1MovingActors';
// import { showcase } from '@/App/Levels/Showcase2TopDown';
// import { showcase } from '@/App/Levels/Showcase3CameraFlying';
// import { showcase } from '@/App/Levels/Showcase4AnimejsSimple';
// import { showcase } from '@/App/Levels/Showcase5AnimejsComplex';
// import { showcase } from '@/App/Levels/Showcase6Fullscreen';
// import { showcase } from '@/App/Levels/Showcase7Text2d';
// import { showcase } from '@/App/Levels/Showcase8Text3d';
// import { showcase } from '@/App/Levels/Showcase9TexturesAndMaterials';
// import { showcase } from '@/App/Levels/Showcase10ComplexMaterials';
// import { showcase } from '@/App/Levels/Showcase11KeyboardAndMouse';
// import { showcase } from '@/App/Levels/Showcase12Light';
// import { showcase } from '@/App/Levels/Showcase13Fog';
import { showcase } from '@/App/Levels/Showcase14SwitchingActiveCamera';
import type { IAppCanvas } from '@/Engine';
import { ambientContext, isNotDefined } from '@/Engine';

const canvas: IAppCanvas | null = ambientContext.container.getCanvasElement('#app');
if (isNotDefined(canvas)) throw new Error('Canvas is not defined');
const { start } = showcase(canvas);
void start();
