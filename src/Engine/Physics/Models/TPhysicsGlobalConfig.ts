import type { Vector3Like } from 'three/src/math/Vector3';

import type { TPhysicsGlobalProps } from './TPhysicsGlobalProps';

export type TPhysicsGlobalConfig = Omit<TPhysicsGlobalProps, 'gravity'> & Readonly<{ gravity: Vector3Like }>;
