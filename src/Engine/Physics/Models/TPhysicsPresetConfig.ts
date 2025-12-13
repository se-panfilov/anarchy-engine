import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { RigidBodyTypesNames } from '@/Engine/Physics/Constants';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TPhysicsPresetProps } from './TPhysicsPresetProps';

// TODO (S.Panfilov) should extend from TPhysicsPresetParams instead of TPhysicsPresetProps?
export type TPhysicsPresetConfig = Omit<TPhysicsPresetProps, 'type'> &
  Readonly<{
    preset: string;
    type: RigidBodyTypesNames;
  }> &
  Pick<TObject3DPropConfig, 'position' | 'rotation' | 'scale'> &
  TWithReadonlyTags;
