import type { Vector3Like } from 'three/src/math/Vector3';

import type { TPhysicsGlobalParams } from './TPhysicsGlobalParams';

export type TPhysicsGlobalConfig = Omit<TPhysicsGlobalParams, 'gravity'> & Readonly<{ gravity: Vector3Like }>;
