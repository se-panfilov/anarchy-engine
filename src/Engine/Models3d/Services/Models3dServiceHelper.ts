import type { Group, Mesh, Object3D } from 'three';

import type { TEulerWrapper } from '@/Engine/Euler';
import type { TVector3Wrapper } from '@/Engine/Vector';

export const applyScale = (model: Group | Mesh | Object3D, scale: TVector3Wrapper): void => void model.scale.copy(scale.entity);
export const applyRotation = (model: Group | Mesh | Object3D, rotation: TEulerWrapper): void => void model.rotation.copy(rotation.entity);
export const applyPosition = (model: Group | Mesh | Object3D, position: TVector3Wrapper): void => void model.position.copy(position.entity);
