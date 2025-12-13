import type { TWithPosition3d, TWithPosition4d } from '@/Engine/Mixins/GameObjects/Models/Position';

import type { TCoordinateAccessorZ } from './TCoordinateAccessor';

export type TMovable3dZ = TWithPosition3d & TCoordinateAccessorZ;
export type TMovable4dZ = TWithPosition4d & TCoordinateAccessorZ;

export type TMovableZ = TMovable3dZ | TMovable4dZ;
