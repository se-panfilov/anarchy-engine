import type { Material, PointsMaterial } from 'three';

export function isPointsMaterial<T extends Material | ReadonlyArray<Material>>(material: PointsMaterial | T): material is PointsMaterial {
  return !Array.isArray(material) && (material as Material).type === 'PointsMaterial';
}
