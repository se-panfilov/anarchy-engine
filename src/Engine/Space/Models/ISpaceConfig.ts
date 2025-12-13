import type { IActorConfig } from '@/Engine/Actor';
import type { ICameraConfig } from '@/Engine/Camera';
import type { IControlsConfig } from '@/Engine/Controls';
import type { IFogConfig } from '@/Engine/Fog';
import type { IIntersectionsWatcherConfig } from '@/Engine/Intersections';
import type { IAnyLightConfig } from '@/Engine/Light';
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
  intersections: ReadonlyArray<IIntersectionsWatcherConfig>;
  lights: ReadonlyArray<IAnyLightConfig>;
  fogs: ReadonlyArray<IFogConfig>;
  texts: ReadonlyArray<ITextConfig>;
  controls: ReadonlyArray<IControlsConfig>;
  envMaps: ReadonlyArray<string>;
}> &
  IWithReadonlyTags;
