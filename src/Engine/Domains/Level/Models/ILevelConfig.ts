import type { IActorConfig } from '@Engine/Domains/Actor';
import type { ICameraConfig } from '@Engine/Domains/Camera';
import type { IControlsConfig } from '@Engine/Domains/Controls';
import type { ILightConfig } from '@Engine/Domains/Light';
import type { ISceneConfig } from '@Engine/Domains/Scene';

import type { CommonTags } from '@/Engine/Domains/Abstract';
import type { LevelTag } from '@/Engine/Domains/Level/Constants';

export type ILevelConfig = Readonly<{
  name: string;
  scenes: ReadonlyArray<ISceneConfig>;
  actors: ReadonlyArray<IActorConfig>;
  cameras: ReadonlyArray<ICameraConfig>;
  lights: ReadonlyArray<ILightConfig>;
  controls: ReadonlyArray<IControlsConfig>;
  tags: ReadonlyArray<LevelTag | CommonTags | string>;
}>;
