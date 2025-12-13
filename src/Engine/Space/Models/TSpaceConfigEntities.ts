import type { TActorConfig } from '@/Engine/Actor';
import type { TCameraConfig } from '@/Engine/Camera';
import type { TControlsConfig } from '@/Engine/Controls';
import type { TFogConfig } from '@/Engine/Fog';
import type { TIntersectionsWatcherConfig } from '@/Engine/Intersections';
import type { TAnyLightConfig } from '@/Engine/Light';
import type { TParticlesConfig } from '@/Engine/Particles';
import type { TPhysicsConfig } from '@/Engine/Physics';
import type { TSpatialGridConfig } from '@/Engine/Spatial';
import type { TTextConfig } from '@/Engine/Text';

export type TSpaceConfigEntities = Readonly<{
  spatialGrids: ReadonlyArray<TSpatialGridConfig>;
  actors: ReadonlyArray<TActorConfig>;
  cameras: ReadonlyArray<TCameraConfig>;
  intersections: ReadonlyArray<TIntersectionsWatcherConfig>;
  lights: ReadonlyArray<TAnyLightConfig>;
  particles: ReadonlyArray<TParticlesConfig>;
  physics: TPhysicsConfig;
  fogs: ReadonlyArray<TFogConfig>;
  texts: ReadonlyArray<TTextConfig>;
  controls: ReadonlyArray<TControlsConfig>;
  // TODO 9.0.0. RESOURCES: Duplication: env maps should do preloading from resources, but applying only from here
  envMaps: ReadonlyArray<string>;
}>;
