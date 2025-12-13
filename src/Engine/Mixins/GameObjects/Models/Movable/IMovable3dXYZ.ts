import type { IWithPosition3d, IWithPosition4d } from '@/Engine/Mixins/GameObjects/Models/Position';

import type { IMovable3dX, IMovable4dX } from './IMovableX';
import type { IMovable3dY, IMovable4dY } from './IMovableY';
import type { IMovable3dZ, IMovable4dZ } from './IMovableZ';

export type IMovable3dXYZ = IWithPosition3d & IMovable3dX & IMovable3dY & IMovable3dZ;
export type IMovable4dXYZ = IWithPosition4d & IMovable4dX & IMovable4dY & IMovable4dZ;

export type IMovableXYZ = IMovable3dXYZ | IMovable4dXYZ;
