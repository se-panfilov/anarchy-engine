import type { Material } from 'three';

export type IWithMaterial = {
  useMaterial: (material: Material) => Material;
};
