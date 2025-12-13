import type { IActorConfig } from '@/Engine/Domains/Actor';
import type { ICameraConfig } from '@/Engine/Domains/Camera';
import type { IControlsConfig } from '@/Engine/Domains/Controls';
import type { LevelTag } from '@/Engine/Domains/Level/Constants';
import type { ILightConfig } from '@/Engine/Domains/Light';
import type { ISceneConfig } from '@/Engine/Domains/Scene';
import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { SchemaVersion } from '@/Engine/Schemas';

export type ILevelConfig = Readonly<{
  name: string;
  version: SchemaVersion;
  scenes: ReadonlyArray<ISceneConfig>;
  actors: ReadonlyArray<IActorConfig>;
  cameras: ReadonlyArray<ICameraConfig>;
  lights: ReadonlyArray<ILightConfig>;
  controls: ReadonlyArray<IControlsConfig>;
}> &
  IWithReadonlyTags<LevelTag>;
