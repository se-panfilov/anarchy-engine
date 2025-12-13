import type { TWithPosition3d, TWithPosition4d } from '@/Engine/Mixins/GameObjects/Models/Position';

import type { TMovable3dX, TMovable4dX } from './TMovableX';
import type { TMovable3dY, TMovable4dY } from './TMovableY';
import type { TMovable3dZ, TMovable4dZ } from './TMovableZ';

export type TMovable3dXYZ = TWithPosition3d & TMovable3dX & TMovable3dY & TMovable3dZ;
export type IMovable4dXYZ = TWithPosition4d & TMovable4dX & TMovable4dY & TMovable4dZ;

export type IMovableXYZ = TMovable3dXYZ | IMovable4dXYZ;
