import '@/App/style.css';

// import { showcaseLevel } from '@/App/Levels/Showcase1MovingActors';
// import { showcaseLevel } from '@/App/Levels/Showcase2TopDown';
// import { showcaseLevel } from '@/App/Levels/Showcase3CameraFlying';
// import { showcaseLevel } from '@/App/Levels/Showcase4AnimejsSimple';
// import { showcaseLevel } from '@/App/Levels/Showcase5AnimejsComplex';
// import { showcaseLevel } from '@/App/Levels/Showcase6Fullscreen';
// import { showcaseLevel } from '@/App/Levels/Showcase7Text2d';
// import { showcaseLevel } from '@/App/Levels/Showcase8Text3d';
// import { showcaseLevel } from '@/App/Levels/Showcase9TexturesAndMaterials';
// import { showcaseLevel } from '@/App/Levels/Showcase10ComplexMaterials';
import { showcaseLevel } from '@/App/Levels/Showcase11KeyboardAndMouse';
// import { showcaseLevel } from '@/App/Levels/Showcase12Light';
// import { showcaseLevel } from '@/App/Levels/Showcase13Fog';
import type { IAppCanvas } from '@/Engine';
import { ambientContext, isNotDefined } from '@/Engine';

const canvas: IAppCanvas | null = ambientContext.container.getCanvasElement('#app');
if (isNotDefined(canvas)) throw new Error('Canvas is not defined');
const { level, start } = showcaseLevel(canvas);
console.log(level);
// level.messages$.subscribe((message: string) => console.log(message));
void start();
