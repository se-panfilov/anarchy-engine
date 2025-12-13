import type { TWithReadonlyTags } from '@/Engine/Mixins';

import type { TPhysicsBodyProps } from './TPhysicsBodyProps';

export type TPhysicsBodyParams = TPhysicsBodyProps &
  Readonly<{
    isSleep?: boolean;
  }> &
  TWithReadonlyTags;
