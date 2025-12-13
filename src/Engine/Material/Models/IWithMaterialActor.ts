import type { Material } from 'three';

export type IWithMaterialActor = {
  useMaterial: (material: Material) => void;
};
