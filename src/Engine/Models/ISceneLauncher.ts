import type { BehaviorSubject } from 'rxjs';

import type { IAppCanvas, IFactories, ISceneConfig } from '@/Engine';

import type { IDestroyable } from './IDestroyable';
import type { ILaunchedScene } from './ILaunchedScene';

export type ISceneLauncher = Readonly<{
  prepare: (canvas: IAppCanvas) => void;
  launch: (sceneConfig: ISceneConfig | unknown, canvas: IAppCanvas, factories: IFactories) => ILaunchedScene;
  prepared$: BehaviorSubject<boolean>;
  launched$: BehaviorSubject<boolean>;
  destroyed$: BehaviorSubject<boolean>;
}> &
  IDestroyable;
