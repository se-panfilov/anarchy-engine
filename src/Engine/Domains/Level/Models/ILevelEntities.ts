import type { IActorFactory, IActorRegistry } from '@/Engine/Domains/Actor';
import type { ICameraFactory, ICameraRegistry } from '@/Engine/Domains/Camera';
import type { IControlsFactory, IControlsRegistry } from '@/Engine/Domains/Controls';
import type { IIntersectionsWatcherFactory, IIntersectionsWatcherRegistry } from '@/Engine/Domains/Intersections';
import type { ILightFactory, ILightRegistry } from '@/Engine/Domains/Light';
import type { IRendererFactory, IRendererRegistry } from '@/Engine/Domains/Renderer';
import type { ISceneFactory, ISceneRegistry } from '@/Engine/Domains/Scene';
import type { ITextFactory, ITextRegistry } from '@/Engine/Domains/Text';

export type ILevelEntities = {
  actorRegistry: IActorRegistry;
  actorFactory: IActorFactory;
  textRegistry: ITextRegistry;
  textFactory: ITextFactory;
  cameraRegistry: ICameraRegistry;
  cameraFactory: ICameraFactory;
  lightRegistry: ILightRegistry;
  lightFactory: ILightFactory;
  controlsRegistry: IControlsRegistry;
  controlsFactory: IControlsFactory;
  intersectionsWatcherRegistry: IIntersectionsWatcherRegistry;
  intersectionsWatcherFactory: IIntersectionsWatcherFactory;
  scenesRegistry: ISceneRegistry;
  scenesFactory: ISceneFactory;
  rendererRegistry: IRendererRegistry;
  rendererFactory: IRendererFactory;
};
