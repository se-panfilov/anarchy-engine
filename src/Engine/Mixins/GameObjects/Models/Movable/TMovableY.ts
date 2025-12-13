import type { TWithPosition2d, TWithPosition3d, TWithPosition4d } from '@/Engine/Mixins/GameObjects/Models/Position';

import type { TCoordinateAccessorY } from './TCoordinateAccessor';

export type TMovable2dY = TWithPosition2d & TCoordinateAccessorY;
export type TMovable3dY = TWithPosition3d & TCoordinateAccessorY;
export type TMovable4dY = TWithPosition4d & TCoordinateAccessorY;

export type TMovableY = TMovable2dY | TMovable3dY | TMovable4dY;
