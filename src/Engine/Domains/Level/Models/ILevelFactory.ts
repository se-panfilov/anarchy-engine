import type { ILoopFactory } from '@Engine/Domains/Loop';

import type { IActorFactory } from '@/Engine/Domains/Actor';
import type { ICameraFactory } from '@/Engine/Domains/Camera';
import type { IControlsFactory } from '@/Engine/Domains/Controls';
import type { IIntersectionsWatcherFactory } from '@/Engine/Domains/Intersections';
import type { ILightFactory } from '@/Engine/Domains/Light';
import type { IRendererFactory } from '@/Engine/Domains/Renderer';
import type { ISceneFactory } from '@/Engine/Domains/Scene';

export type ILevelFactory = Readonly<{
  actor: IActorFactory;
  camera: ICameraFactory;
  light: ILightFactory;
  controls: IControlsFactory;
  intersectionsWatcher: IIntersectionsWatcherFactory;
  loop: ILoopFactory;
  scenes: ISceneFactory;
  renderer: IRendererFactory;
}>;
