import type { IActorConfig } from './IActorConfig';
import type { ICameraConfig } from './ICameraConfig';
import type { ILightConfig } from './ILightConfig';

export interface ISceneConfig {
  readonly name: string;
  readonly actors: ReadonlyArray<IActorConfig>;
  readonly cameras: ReadonlyArray<ICameraConfig>;
  readonly lights: ReadonlyArray<ILightConfig>;
}
