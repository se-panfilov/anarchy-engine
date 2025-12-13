import type { IActorConfig } from './IActorConfig';
import type { ICameraConfig } from './ICameraConfig';
import type { ILightConfig } from './ILightConfig';
import type { IControlsConfig } from './IControlsConfig';

export type ISceneConfig = Readonly<{
  name: string;
  actors: ReadonlyArray<IActorConfig>;
  cameras: ReadonlyArray<ICameraConfig>;
  lights: ReadonlyArray<ILightConfig>;
  controls: ReadonlyArray<IControlsConfig>;
}>;
