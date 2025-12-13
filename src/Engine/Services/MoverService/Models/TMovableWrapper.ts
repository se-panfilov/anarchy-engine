import type { Vector3 } from 'three';

import type { TMovable3dXYZ, TWithEntity } from '@/Engine/Mixins';
import type { TObject3D } from '@/Engine/ThreeLib';

export type TMovableWrapper<T> = TWithEntity<T> & TMovable3dXYZ;
export type TEntityWithPosition<T = unknown> = T & Pick<TObject3D, 'position'>;
export type TMovableEntityWrapper<T = TEntityWithPosition> = TMovableWrapper<T>;
export type TMovableWithModel3dFacade = TWithEntity<Readonly<{ getModel3d: () => Readonly<{ position: Vector3 }> }>>;
