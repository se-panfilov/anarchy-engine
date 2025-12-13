import type { TActorConfig } from '@/Engine/Actor';
import type { TCameraConfig } from '@/Engine/Camera';
import type { TControlsConfig } from '@/Engine/Controls';
import type { TFogConfig } from '@/Engine/Fog';
import type { TIntersectionsWatcherConfig } from '@/Engine/Intersections';
import type { TAnyLightConfig } from '@/Engine/Light';
import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TParticlesConfig } from '@/Engine/Particles';
import type { TSceneConfig } from '@/Engine/Scene';
import type { SpaceSchemaVersion } from '@/Engine/Space/Constants';
import type { TTextConfig } from '@/Engine/Text';

export type TSpaceConfig = Readonly<{
  name: string;
  version: SpaceSchemaVersion;
  scenes: ReadonlyArray<TSceneConfig>;
  actors: ReadonlyArray<TActorConfig>;
  cameras: ReadonlyArray<TCameraConfig>;
  intersections: ReadonlyArray<TIntersectionsWatcherConfig>;
  lights: ReadonlyArray<TAnyLightConfig>;
  particles: ReadonlyArray<TParticlesConfig>;
  fogs: ReadonlyArray<TFogConfig>;
  texts: ReadonlyArray<TTextConfig>;
  controls: ReadonlyArray<TControlsConfig>;
  envMaps: ReadonlyArray<string>;
}> &
  TWithReadonlyTags;
