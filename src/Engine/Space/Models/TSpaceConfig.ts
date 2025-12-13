import type { TActorConfig } from '@/Engine/Actor';
import type { TCameraConfig } from '@/Engine/Camera';
import type { TControlsConfig } from '@/Engine/Controls';
import type { IFogConfig } from '@/Engine/Fog';
import type { IIntersectionsWatcherConfig } from '@/Engine/Intersections';
import type { IAnyLightConfig } from '@/Engine/Light';
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
  intersections: ReadonlyArray<IIntersectionsWatcherConfig>;
  lights: ReadonlyArray<IAnyLightConfig>;
  particles: ReadonlyArray<IParticlesConfig>;
  fogs: ReadonlyArray<IFogConfig>;
  texts: ReadonlyArray<ITextConfig>;
  controls: ReadonlyArray<TControlsConfig>;
  envMaps: ReadonlyArray<string>;
}> &
  TWithReadonlyTags;
