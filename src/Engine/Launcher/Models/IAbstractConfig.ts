import type {
  IActorConfig,
  ICameraConfig,
  ILightConfig,
  ISceneConfig,
  IVector2dConfig,
  IVector3dConfig
} from '@Engine/Launcher/Models';

export type IAbstractConfig =
  | IActorConfig
  | ICameraConfig
  | ILightConfig
  | ISceneConfig
  | IVector2dConfig
  | IVector3dConfig
  | void;
