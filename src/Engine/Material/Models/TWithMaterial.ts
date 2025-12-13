import type { Material } from 'three';

export type TWithMaterial = {
  useMaterial: (material: Material) => Material;
};
