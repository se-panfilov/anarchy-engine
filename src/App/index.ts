import '@/App/style.css';

// import { showcaseLevel } from '@/App/Levels/ShowcaseLevel1'; //Showcase 1: Moving actor with intersections & reading data from config
// import { showcaseLevel } from '@/App/Levels/ShowcaseLevel2'; //Showcase 2: Top-down controls with dynamic actors and camera creation
// import { showcaseLevel } from '@/App/Levels/ShowcaseLevel3'; //Showcase 3: Camera flying around the central actor
// import { showcaseLevel } from '@/App/Levels/ShowcaseLevel4'; //Showcase 4: Anime.js simple animations (easing, etc.)
// import { showcaseLevel } from '@/App/Levels/ShowcaseLevel5'; //Showcase 5: Anime.js animation with complex path and easing
// import { showcaseLevel } from '@/App/Levels/ShowcaseLevel6'; //Showcase 6: Go fullscreen
// import { showcaseLevel } from '@/App/Levels/ShowcaseLevel7'; //Showcase 7: Fancy text
import { showcaseLevel } from '@/App/Levels/ShowcaseLevel8'; //Showcase 8: Textures
import type { IAppCanvas } from '@/Engine';
import { ambientContext, isNotDefined } from '@/Engine';

const canvas: IAppCanvas | null = ambientContext.container.getCanvasElement('#app');
if (isNotDefined(canvas)) throw new Error('Canvas is not defined');
const { level, start } = showcaseLevel(canvas);
console.log(level);
// level.messages$.subscribe((message: string) => console.log(message));
void start();
