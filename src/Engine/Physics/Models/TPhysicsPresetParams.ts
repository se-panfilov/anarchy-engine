import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { TPhysicsPresetProps } from './TPhysicsPresetProps';

export type TPhysicsPresetParams = TPhysicsPresetProps & Pick<TObject3DParams, 'position' | 'rotation'> & TWithReadonlyTags;
