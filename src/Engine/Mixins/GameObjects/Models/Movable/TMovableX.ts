import type { TWithPosition2d, TWithPosition3d, TWithPosition4d } from '@/Engine/Mixins/GameObjects/Models/Position';

import type { TCoordinateAccessorX } from './TCoordinateAccessor';

export type TMovable2dX = TWithPosition2d & TCoordinateAccessorX;
export type TMovable3dX = TWithPosition3d & TCoordinateAccessorX;
export type TMovable4dX = TWithPosition4d & TCoordinateAccessorX;

export type TMovableX = TMovable2dX | TMovable3dX | TMovable4dX;
