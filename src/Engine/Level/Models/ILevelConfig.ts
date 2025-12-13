import type { IActorConfig } from '@/Engine/Actor';
import type { ICameraConfig } from '@/Engine/Camera';
import type { IOrbitControlsConfig } from '@/Engine/Controls';
import type { LevelSchemaVersion, LevelTag } from '@/Engine/Level/Constants';
import type { ILightConfig } from '@/Engine/Light';
import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { ISceneConfig } from '@/Engine/Scene';
import type { ITextConfig } from '@/Engine/Text';
import type { IFogConfig } from '@/Engine/Fog';

export type ILevelConfig = Readonly<{
  name: string;
  version: LevelSchemaVersion;
  scenes: ReadonlyArray<ISceneConfig>;
  actors: ReadonlyArray<IActorConfig>;
  cameras: ReadonlyArray<ICameraConfig>;
  lights: ReadonlyArray<ILightConfig>;
  fog: ReadonlyArray<IFogConfig>;
  texts: ReadonlyArray<ITextConfig>;
  controls: ReadonlyArray<IOrbitControlsConfig>;
  envMaps: ReadonlyArray<string>;
}> &
  IWithReadonlyTags<LevelTag>;
