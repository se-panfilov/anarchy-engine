import type { TWithCoordsXYZ } from '@/Engine/Mixins';

import type { TPhysicsGlobalProps } from './TPhysicsGlobalProps';

export type TPhysicsGlobalConfig = Omit<TPhysicsGlobalProps, 'gravity'> & Readonly<{ gravity: TWithCoordsXYZ }>;
