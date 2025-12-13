import type { Vector3Like } from 'three';

import type { TPhysicsGlobalParams } from './TPhysicsGlobalParams';

export type TPhysicsGlobalConfig = Omit<TPhysicsGlobalParams, 'gravity'> & Readonly<{ gravity: Vector3Like }>;
