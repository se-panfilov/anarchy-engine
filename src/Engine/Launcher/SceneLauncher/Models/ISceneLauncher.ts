import type { IAppCanvas } from '@Engine/Domains/App';
import type { IDestroyable } from '@Engine/Domains/Mixins';
import type { ISceneConfig } from '@Engine/Domains/Scene';
import type { BehaviorSubject } from 'rxjs';

import type { ILaunchedScene } from './ILaunchedScene';

export type ISceneLauncher = Readonly<{
  prepare: (canvas: IAppCanvas) => void;
  launch: (sceneConfig: ISceneConfig, canvas: IAppCanvas, factories: IFactories) => ILaunchedScene;
  prepared$: BehaviorSubject<boolean>;
  launched$: BehaviorSubject<boolean>;
  destroyed$: BehaviorSubject<boolean>;
}> &
  IDestroyable;
