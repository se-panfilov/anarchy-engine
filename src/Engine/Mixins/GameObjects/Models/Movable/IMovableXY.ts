import type { IMovable2dX } from './IMovableX';
import type { IMovable2dY } from './IMovableY';

export type IMovable2dXY = IMovable2dX & IMovable2dY;
export type IMovable3dXY = IMovable2dX & IMovable2dY;
export type IMovable4dXY = IMovable2dX & IMovable2dY;

export type IMovableXY = IMovable2dXY | IMovable3dXY | IMovable4dXY;
