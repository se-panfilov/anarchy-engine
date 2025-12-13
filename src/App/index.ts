import '@/App/style.css';

import { showcaseLevel1 as showcase } from '@/App/Levels/ShowcaseLevel1';
// import { showcaseLevel2 as showcase } from '@/App/Levels/ShowcaseLevel2';
import type { IAppCanvas } from '@/Engine';
import { ambientContext, isNotDefined } from '@/Engine';

const canvas: IAppCanvas | null = ambientContext.container.getCanvasElement('#app');
if (isNotDefined(canvas)) throw new Error('Canvas is not defined');
const { level, start } = showcase(canvas);
console.log(level);
// level.messages$.subscribe((message: string) => console.log(message));
start();
