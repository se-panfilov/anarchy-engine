import type { ActorType } from '@/Engine/Actor/Constants';
import type { TMaterialPackConfig, TMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TActorProps } from './TActorProps';

export type TActorConfig = Omit<TActorProps, 'material'> &
  Readonly<{
    material: TMaterialPackConfig<TMaterialTexturePack>;
  }> &
  Readonly<{
    type: ActorType;
    castShadow: boolean;
  }> &
  TObject3DPropConfig &
  TWithReadonlyTags;
