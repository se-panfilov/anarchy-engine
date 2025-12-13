import type { IActorFactory, ICameraFactory, ILightFactory, ILoopFactory, IRendererFactory, ISceneFactory } from '@Engine/Factories';

export type IFactories = Readonly<{
  sceneFactory: ISceneFactory;
  actorFactory: IActorFactory;
  cameraFactory: ICameraFactory;
  lightFactory: ILightFactory;
  rendererFactory: IRendererFactory;
  loopFactory: ILoopFactory;
}>;
