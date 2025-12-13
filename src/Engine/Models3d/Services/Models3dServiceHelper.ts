import type { Group, Mesh, Vector3 } from 'three';

export function applyScale(model: Mesh | Group, scale: Vector3): void {
  model.scale.copy(scale);
}
