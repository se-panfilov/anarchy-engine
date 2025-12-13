import type { Vector3Like } from 'three';

import type { TPhysicsWorldParams } from './TPhysicsWorldParams';

export type TPhysicsWorldConfig = Omit<TPhysicsWorldParams, 'gravity'> & Readonly<{ gravity: Vector3Like }>;
