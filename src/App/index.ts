import '@/App/style.css';

// import { showcaseLevel } from '@/App/Levels/Showcase1MovingActors'; //Showcase 1: Moving actor with intersections & reading data from config
// import { showcaseLevel } from '@/App/Levels/Showcase2TopDown'; //Showcase 2: Top-down controls with dynamic actors and camera creation
// import { showcaseLevel } from '@/App/Levels/Showcase3CameraFlying'; //Showcase 3: Camera flying around the central actor
// import { showcaseLevel } from '@/App/Levels/Showcase4AnimejsSimple'; //Showcase 4: Anime.js simple animations (easing, etc.)
// import { showcaseLevel } from '@/App/Levels/Showcase5AnimejsComplex'; //Showcase 5: Anime.js animation with complex path and easing
// import { showcaseLevel } from '@/App/Levels/Showcase6Fullscreen'; //Showcase 6: Go fullscreen
// import { showcaseLevel } from '@/App/Levels/Showcase7Text2d'; //Showcase 7: Text 2d
// import { showcaseLevel } from '@/App/Levels/Showcase8Text3d'; //Showcase 7: Text 3d
import { showcaseLevel } from '@/App/Levels/ShowcaseLevel9TexturesAndMaterials'; //Showcase 9: Textures & Materials
import type { IAppCanvas } from '@/Engine';
import { ambientContext, isNotDefined } from '@/Engine';

const canvas: IAppCanvas | null = ambientContext.container.getCanvasElement('#app');
if (isNotDefined(canvas)) throw new Error('Canvas is not defined');
const { level, start } = showcaseLevel(canvas);
console.log(level);
// level.messages$.subscribe((message: string) => console.log(message));
void start();
