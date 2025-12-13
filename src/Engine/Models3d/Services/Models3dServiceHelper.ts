import type { Group, Mesh } from 'three';

import type { TEulerWrapper } from '@/Engine/Euler';
import type { TVector3Wrapper } from '@/Engine/Vector';

export const applyScale = (model: Mesh | Group, scale: TVector3Wrapper): void => void model.scale.copy(scale.entity);
export const applyRotation = (model: Mesh | Group, rotation: TEulerWrapper): void => void model.rotation.copy(rotation.entity);
export const applyPosition = (model: Mesh | Group, position: TVector3Wrapper): void => void model.position.copy(position.entity);
