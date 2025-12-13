import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TVector3Wrapper, TVector4Wrapper } from '@/Engine/Vector';

import type { TPhysicsBodyProps } from './TPhysicsBodyProps';

export type TPhysicsBodyParams = TPhysicsBodyProps &
  Readonly<{
    position?: TVector3Wrapper;
    rotation?: TVector4Wrapper;
    shouldUpdateKinematic?: boolean;
    isSleep?: boolean;
  }> &
  TWithReadonlyTags;
