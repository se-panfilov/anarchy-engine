import type { TActorConfig } from '@/Engine/Actor';
import type { TCameraConfig } from '@/Engine/Camera';
import type { TControlsConfig } from '@/Engine/Controls';
import type { TFogConfig } from '@/Engine/Fog';
import type { TIntersectionsWatcherConfig } from '@/Engine/Intersections';
import type { TAnyLightConfig } from '@/Engine/Light';
import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { IParticlesConfig } from '@/Engine/Particles';
import type { ISceneConfig } from '@/Engine/Scene';
import type { SpaceSchemaVersion } from '@/Engine/Space/Constants';
import type { ITextConfig } from '@/Engine/Text';

export type TSpaceConfig = Readonly<{
  name: string;
  version: SpaceSchemaVersion;
  scenes: ReadonlyArray<ISceneConfig>;
  actors: ReadonlyArray<TActorConfig>;
  cameras: ReadonlyArray<TCameraConfig>;
  intersections: ReadonlyArray<TIntersectionsWatcherConfig>;
  lights: ReadonlyArray<TAnyLightConfig>;
  particles: ReadonlyArray<IParticlesConfig>;
  fogs: ReadonlyArray<TFogConfig>;
  texts: ReadonlyArray<ITextConfig>;
  controls: ReadonlyArray<TControlsConfig>;
  envMaps: ReadonlyArray<string>;
}> &
  TWithReadonlyTags;
