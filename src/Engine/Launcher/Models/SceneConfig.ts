import type { ActorConfig } from './ActorConfig';
import type { CameraConfig } from './CameraConfig';
import type { LightConfig } from './LightConfig';

export interface SceneConfig {
  readonly name: string;
  readonly actors: ReadonlyArray<ActorConfig>;
  readonly cameras: ReadonlyArray<CameraConfig>;
  readonly lights: ReadonlyArray<LightConfig>;
}
