import type { IActorConfig } from '@/Engine/Actor';
import type { ICameraConfig } from '@/Engine/Camera';
import type { IOrbitControlsConfig } from '@/Engine/Controls';
import type { IFogConfig } from '@/Engine/Fog';
import type { ILightConfig } from '@/Engine/Light';
import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { ISceneConfig } from '@/Engine/Scene';
import type { SpaceSchemaVersion } from '@/Engine/Space/Constants';
import type { ITextConfig } from '@/Engine/Text';

export type ISpaceConfig = Readonly<{
  name: string;
  version: SpaceSchemaVersion;
  scenes: ReadonlyArray<ISceneConfig>;
  actors: ReadonlyArray<IActorConfig>;
  cameras: ReadonlyArray<ICameraConfig>;
  lights: ReadonlyArray<ILightConfig>;
  fogs: ReadonlyArray<IFogConfig>;
  texts: ReadonlyArray<ITextConfig>;
  controls: ReadonlyArray<IOrbitControlsConfig>;
  envMaps: ReadonlyArray<string>;
}> &
  IWithReadonlyTags<string>;
