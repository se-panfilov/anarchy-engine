import type { IActorConfig } from '@Engine/Domains/Actor/Models';
import type { ICameraConfig } from '@Engine/Domains/Camera/Models';
import type { IControlsConfig } from '@Engine/Domains/Controls/Models';
import type { ILightConfig } from '@Engine/Domains/Light/Models';
import type { SceneTag } from '@Engine/Domains/Scene/Constants';

export type ISceneConfig = Readonly<{
  name: string;
  actors: ReadonlyArray<IActorConfig>;
  cameras: ReadonlyArray<ICameraConfig>;
  lights: ReadonlyArray<ILightConfig>;
  controls: ReadonlyArray<IControlsConfig>;
  tags: ReadonlyArray<SceneTag>;
}>;
