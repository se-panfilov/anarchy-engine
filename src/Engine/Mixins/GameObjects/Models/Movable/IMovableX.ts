import type { IWithPosition2d, IWithPosition3d, IWithPosition4d } from '@/Engine/Mixins/GameObjects/Models/Position';

import type { ICoordinateAccessorX } from './ICoordinateAccessor';

export type IMovable2dX = IWithPosition2d & ICoordinateAccessorX;
export type IMovable3dX = IWithPosition3d & ICoordinateAccessorX;
export type IMovable4dX = IWithPosition4d & ICoordinateAccessorX;

export type IMovableX = IMovable2dX | IMovable3dX | IMovable4dX;
