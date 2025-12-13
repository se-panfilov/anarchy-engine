import type { ActorType } from '@/Engine/Actor/Constants';
import type { IMaterialPackConfig, IMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import type { IWithReadonlyTags } from '@/Engine/Mixins';
import type { IObject3DPropConfig } from '@/Engine/ThreeLib';

import type { IActorProps } from './IActorProps';

export type IActorConfig = Omit<IActorProps, 'material'> &
  Readonly<{
    material: IMaterialPackConfig<IMaterialTexturePack>;
  }> &
  Readonly<{
    type: ActorType;
    width: number;
    height: number;
    castShadow: boolean;
  }> &
  IObject3DPropConfig &
  IWithReadonlyTags;
