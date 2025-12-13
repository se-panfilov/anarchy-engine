import type { SceneTag } from '@Engine/Constants';

import type { IActorConfig } from './IActorConfig';
import type { ICameraConfig } from './ICameraConfig';
import type { IControlsConfig } from './IControlsConfig';
import type { ILightConfig } from './ILightConfig';

export type ISceneConfig = Readonly<{
  name: string;
  actors: ReadonlyArray<IActorConfig>;
  cameras: ReadonlyArray<ICameraConfig>;
  lights: ReadonlyArray<ILightConfig>;
  controls: ReadonlyArray<IControlsConfig>;
  tags: ReadonlyArray<SceneTag>;
}>;
