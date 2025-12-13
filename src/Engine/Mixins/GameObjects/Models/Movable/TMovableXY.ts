import type { TMovable2dX } from './TMovableX';
import type { TMovable2dY } from './TMovableY';

export type TMovable2dXY = TMovable2dX & TMovable2dY;
export type TMovable3dXY = TMovable2dX & TMovable2dY;
export type TMovable4dXY = TMovable2dX & TMovable2dY;

export type TMovableXY = TMovable2dXY | TMovable3dXY | TMovable4dXY;
