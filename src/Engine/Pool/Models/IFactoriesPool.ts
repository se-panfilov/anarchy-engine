import type {
  IActorFactory,
  ICameraFactory,
  IControlsFactory,
  ILightFactory,
  ILoopFactory,
  IRendererFactory,
  ISceneFactory
} from '@Engine/Factories';

export type IFactoriesPool = Readonly<{
  sceneFactory: ISceneFactory;
  actorFactory: IActorFactory;
  cameraFactory: ICameraFactory;
  lightFactory: ILightFactory;
  rendererFactory: IRendererFactory;
  controlsFactory: IControlsFactory;
  loopFactory: ILoopFactory;
}>;
