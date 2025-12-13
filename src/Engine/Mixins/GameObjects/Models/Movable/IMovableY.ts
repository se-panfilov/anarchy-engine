import type { IWithPosition2d, IWithPosition3d, IWithPosition4d } from '@/Engine/Mixins/GameObjects/Models/Position';

import type { ICoordinateAccessorY } from './ICoordinateAccessor';

export type IMovable2dY = IWithPosition2d & ICoordinateAccessorY;
export type IMovable3dY = IWithPosition3d & ICoordinateAccessorY;
export type IMovable4dY = IWithPosition4d & ICoordinateAccessorY;

export type IMovableY = IMovable2dY | IMovable3dY | IMovable4dY;
