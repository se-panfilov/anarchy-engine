import type { IActorConfig } from '@/Engine/Domains/Actor';
import type { ICameraConfig } from '@/Engine/Domains/Camera';
import type { IOrbitControlsConfig } from '@/Engine/Domains/Controls';
import type { LevelSchemaVersion, LevelTag } from '@/Engine/Domains/Level/Constants';
import type { ILightConfig } from '@/Engine/Domains/Light';
import type { ISceneConfig } from '@/Engine/Domains/Scene';
import type { ITextConfig } from '@/Engine/Domains/Text';
import type { IWithReadonlyTags } from '@/Engine/Mixins';

export type ILevelConfig = Readonly<{
  name: string;
  version: LevelSchemaVersion;
  scenes: ReadonlyArray<ISceneConfig>;
  actors: ReadonlyArray<IActorConfig>;
  cameras: ReadonlyArray<ICameraConfig>;
  lights: ReadonlyArray<ILightConfig>;
  texts: ReadonlyArray<ITextConfig>;
  controls: ReadonlyArray<IOrbitControlsConfig>;
  envMaps: ReadonlyArray<string>;
}> &
  IWithReadonlyTags<LevelTag>;
