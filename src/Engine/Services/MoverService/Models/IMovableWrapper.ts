import type { TMovable3dXYZ, IWithEntity } from '@/Engine/Mixins';
import type { IObject3D } from '@/Engine/ThreeLib';

export type IMovableWrapper<T> = IWithEntity<T> & TMovable3dXYZ;
export type IEntityWithPosition<T = unknown> = T & Pick<IObject3D, 'position'>;
export type IMovableEntityWrapper<T = IEntityWithPosition> = IMovableWrapper<T>;
