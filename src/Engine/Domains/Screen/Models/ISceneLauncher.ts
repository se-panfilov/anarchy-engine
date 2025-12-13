import type { ISceneConfig } from '@Engine/Domains/Scene';
import type { IDestroyable } from '@Engine/Mixins';
import type { IAppCanvas } from '@Engine/Models/IAppCanvas';
import type { IFactories } from '@Engine/Pool';
import type { BehaviorSubject } from 'rxjs';

import type { ILaunchedScene } from '@/Engine/Models';

export type ISceneLauncher = Readonly<{
  prepare: (canvas: IAppCanvas) => void;
  launch: (sceneConfig: ISceneConfig, canvas: IAppCanvas, factories: IFactories) => ILaunchedScene;
  prepared$: BehaviorSubject<boolean>;
  launched$: BehaviorSubject<boolean>;
  destroyed$: BehaviorSubject<boolean>;
}> &
  IDestroyable;
