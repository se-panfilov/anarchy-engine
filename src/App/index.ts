import '@/App/style.css';

// import { showcaseLevel } from '@/App/Levels/Showcase1MovingActors'; // Moving actor with intersections & reading data from config
import { showcaseLevel } from '@/App/Levels/Showcase2TopDown'; // Top-down controls with dynamic actors and camera creation
// import { showcaseLevel } from '@/App/Levels/Showcase3CameraFlying'; // Camera flying around the central actor
// import { showcaseLevel } from '@/App/Levels/Showcase4AnimejsSimple'; // Anime.js simple animations (easing, etc.)
// import { showcaseLevel } from '@/App/Levels/Showcase5AnimejsComplex'; // Anime.js animation with complex path and easing
// import { showcaseLevel } from '@/App/Levels/Showcase6Fullscreen'; // Go fullscreen
// import { showcaseLevel } from '@/App/Levels/Showcase7Text2d'; // Text 2d
// import { showcaseLevel } from '@/App/Levels/Showcase8Text3d'; // Text 3d
// import { showcaseLevel } from '@/App/Levels/ShowcaseLevel9TexturesAndMaterials'; // Textures & Materials
// import { showcaseLevel } from '@/App/Levels/ShowcaseLevel10ComplexMaterials'; // Textures & Materials
import type { IAppCanvas } from '@/Engine';
import { ambientContext, isNotDefined } from '@/Engine';

const canvas: IAppCanvas | null = ambientContext.container.getCanvasElement('#app');
if (isNotDefined(canvas)) throw new Error('Canvas is not defined');
const { level, start } = showcaseLevel(canvas);
console.log(level);
// level.messages$.subscribe((message: string) => console.log(message));
void start();
