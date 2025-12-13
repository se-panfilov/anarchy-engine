import '@/App/style.css';

// import { showcaseLevel } from '@/App/Levels/ShowcaseLevel1';
// import { showcaseLevel } from '@/App/Levels/ShowcaseLevel2';
// import { showcaseLevel } from '@/App/Levels/ShowcaseLevel3';
// import { showcaseLevel } from '@/App/Levels/ShowcaseLevel4';
// import { showcaseLevel } from '@/App/Levels/ShowcaseLevel5';
import { showcaseLevel } from '@/App/Levels/ShowcaseLevel6';
import type { IAppCanvas } from '@/Engine';
import { ambientContext, isNotDefined } from '@/Engine';

const canvas: IAppCanvas | null = ambientContext.container.getCanvasElement('#app');
if (isNotDefined(canvas)) throw new Error('Canvas is not defined');
const { level, start } = showcaseLevel(canvas);
console.log(level);
// level.messages$.subscribe((message: string) => console.log(message));
start();
