import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { TPhysicsBodyProps } from './TPhysicsBodyProps';

export type TPhysicsBodyParams = TPhysicsBodyProps & Pick<TObject3DParams, 'position' | 'rotation'> & TWithReadonlyTags;
