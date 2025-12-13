import type { ActorType } from '@/Engine/Actor/Constants';
import type { TMaterialPackConfig, TMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TWithPresetNamePhysicsBodyConfig } from '@/Engine/Physics';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TActorProps } from './TActorProps';

export type TActorConfig = Omit<TActorProps, 'material'> &
  Readonly<{
    material: TMaterialPackConfig<TMaterialTexturePack>;
    type: ActorType;
    castShadow: boolean;
    physics: TWithPresetNamePhysicsBodyConfig;
  }> &
  TObject3DPropConfig &
  TWithReadonlyTags;
