import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { TObjectPhysicsParams } from './TObjectPhysicsParams';
import type { TPhysicsPresetProps } from './TPhysicsPresetProps';

export type TPhysicsPresetParams = TPhysicsPresetProps & TObjectPhysicsParams & Pick<TObject3DParams, 'position' | 'rotation' | 'scale'> & TWithReadonlyTags;
