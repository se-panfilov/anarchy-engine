import type {
  ActorConfig,
  CameraConfig,
  LightConfig,
  SceneConfig,
  Vector2dConfig,
  Vector3dConfig
} from '@Engine/Launcher/Models';

export type AbstractConfig =
  | ActorConfig
  | CameraConfig
  | LightConfig
  | SceneConfig
  | Vector2dConfig
  | Vector3dConfig
  | void;
