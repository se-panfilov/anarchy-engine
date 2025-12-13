import type { IMovable3dXYZ, IWithEntity } from '@/Engine/Mixins';
import type { IObject3D } from '@/Engine/ThreeLib';

export type IMovableWrapper<T> = IWithEntity<T> & IMovable3dXYZ;
export type IEntityWithPosition<T = unknown> = T & Pick<IObject3D, 'position'>;
export type IMovableEntityWrapper<T = IEntityWithPosition> = IMovableWrapper<T>;
