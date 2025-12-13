import type { IWithPosition3d, IWithPosition4d } from '@/Engine/Mixins/GameObjects/Models/Position';

import type { ICoordinateAccessorZ } from './ICoordinateAccessor';

export type IMovable3dZ = IWithPosition3d & ICoordinateAccessorZ;
export type IMovable4dZ = IWithPosition4d & ICoordinateAccessorZ;

export type IMovableZ = IMovable3dZ | IMovable4dZ;
