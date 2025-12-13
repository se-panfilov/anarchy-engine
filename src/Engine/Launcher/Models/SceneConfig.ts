import type { ActorConfig } from '@Engine/Launcher/Models/ActorConfig';
import type { CameraConfig } from '@Engine/Launcher/Models/CameraConfig';
import type { LightConfig } from '@Engine/Launcher/Models/LightConfig';

export interface SceneConfig {
  readonly name: string;
  readonly actors: ReadonlyArray<ActorConfig>;
  readonly cameras: ReadonlyArray<CameraConfig>;
  readonly lights: ReadonlyArray<LightConfig>;
}
