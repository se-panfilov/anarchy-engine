import type { TActorConfig } from '@/Engine/Actor';
import type { TCameraConfig } from '@/Engine/Camera';
import type { TControlsConfig } from '@/Engine/Controls';
import type { TEnvMapConfig } from '@/Engine/EnvMap';
import type { TFogConfig } from '@/Engine/Fog';
import type { TFsmConfig } from '@/Engine/Fsm';
import type { TIntersectionsWatcherConfig } from '@/Engine/Intersections';
import type { TAnyLightConfig } from '@/Engine/Light';
import type { TModel3dConfig } from '@/Engine/Models3d';
import type { TParticlesConfig } from '@/Engine/Particles';
import type { TPhysicsConfig } from '@/Engine/Physics';
import type { TSpatialGridConfig } from '@/Engine/Spatial';
import type { TTextConfig } from '@/Engine/Text';

export type TSpaceConfigEntities = Readonly<{
  spatialGrids: ReadonlyArray<TSpatialGridConfig>;
  actors: ReadonlyArray<TActorConfig>;
  cameras: ReadonlyArray<TCameraConfig>;
  envMaps: ReadonlyArray<TEnvMapConfig>;
  intersections: ReadonlyArray<TIntersectionsWatcherConfig>;
  lights: ReadonlyArray<TAnyLightConfig>;
  fsm: ReadonlyArray<TFsmConfig>;
  models3d: ReadonlyArray<TModel3dConfig>;
  particles: ReadonlyArray<TParticlesConfig>;
  physics: TPhysicsConfig;
  fogs: ReadonlyArray<TFogConfig>;
  texts: ReadonlyArray<TTextConfig>;
  controls: ReadonlyArray<TControlsConfig>;
}>;
