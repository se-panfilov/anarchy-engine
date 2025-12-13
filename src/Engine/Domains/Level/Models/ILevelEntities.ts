import type { IActorFactory, IActorRegistry } from '@/Engine/Domains/Actor';
import type { ICameraFactory, ICameraRegistry } from '@/Engine/Domains/Camera';
import type { IControlsFactory, IControlsRegistry } from '@/Engine/Domains/Controls';
import type { IIntersectionsWatcherFactory, IIntersectionsWatcherRegistry } from '@/Engine/Domains/Intersections';
import type { ILightFactory, ILightRegistry } from '@/Engine/Domains/Light';
import type { ILoopFactory, ILoopRegistry } from '@/Engine/Domains/Loop';
import type { IRendererFactory, IRendererRegistry } from '@/Engine/Domains/Renderer';
import type { ISceneFactory, ISceneRegistry } from '@/Engine/Domains/Scene';

export type ILevelEntities = {
  actorRegistry: IActorRegistry;
  actorFactory: IActorFactory;
  cameraRegistry: ICameraRegistry;
  cameraFactory: ICameraFactory;
  lightRegistry: ILightRegistry;
  lightFactory: ILightFactory;
  controlsRegistry: IControlsRegistry;
  controlsFactory: IControlsFactory;
  intersectionsWatcherRegistry: IIntersectionsWatcherRegistry;
  intersectionsWatcherFactory: IIntersectionsWatcherFactory;
  loopRegistry: ILoopRegistry;
  loopFactory: ILoopFactory;
  scenesRegistry: ISceneRegistry;
  scenesFactory: ISceneFactory;
  rendererRegistry: IRendererRegistry;
  rendererFactory: IRendererFactory;
};
