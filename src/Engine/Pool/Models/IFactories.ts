import type { IActorFactory } from '@Engine/Domains/Actor';
import type { ICameraFactory } from '@Engine/Domains/Camera';
import type { ILightFactory } from '@Engine/Domains/Light';
import type { ILoopFactory } from '@Engine/Domains/Loop';
import type { IRendererFactory } from '@Engine/Domains/Renderer';
import type { ISceneFactory } from '@Engine/Domains/Scene';

export type IFactories = Readonly<{
  sceneFactory: ISceneFactory;
  actorFactory: IActorFactory;
  cameraFactory: ICameraFactory;
  lightFactory: ILightFactory;
  rendererFactory: IRendererFactory;
  loopFactory: ILoopFactory;
}>;
