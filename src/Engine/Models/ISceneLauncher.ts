import type { IDestroyable } from '@Engine/Models/IDestroyable';
import type { IStartedScene } from '@Engine/Models/IStartedScene';
import type { BehaviorSubject } from 'rxjs';

export type ISceneLauncher = Readonly<{
  prepare: () => void;
  launch: () => IStartedScene;
  prepared$: BehaviorSubject<boolean>;
  launched$: BehaviorSubject<boolean>;
  destroyed$: BehaviorSubject<boolean>;
}> &
  IDestroyable;
