import type { IObject3D } from '@/Engine/Domains/ThreeLib';
import type { IMovableXYZ, IWithEntity } from '@/Engine/Mixins';

export type IMovableWrapper<T> = IWithEntity<T> & IMovableXYZ;
export type IEntityWithPosition<T = unknown> = T & Pick<IObject3D, 'position'>;
export type IMovableEntityWrapper<T = IEntityWithPosition> = IMovableWrapper<T>;
