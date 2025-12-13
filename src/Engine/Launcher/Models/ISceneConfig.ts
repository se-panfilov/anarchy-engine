import type { IActorConfig } from './IActorConfig';
import type { ICameraConfig } from './ICameraConfig';
import type { ILightConfig } from './ILightConfig';
import type { IControlsConfig } from './IControlsConfig';

export interface ISceneConfig {
  readonly name: string;
  readonly actors: ReadonlyArray<IActorConfig>;
  readonly cameras: ReadonlyArray<ICameraConfig>;
  readonly lights: ReadonlyArray<ILightConfig>;
  readonly controls: ReadonlyArray<IControlsConfig>;
}
