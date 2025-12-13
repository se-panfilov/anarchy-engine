import type { MeshBasicMaterialParameters } from 'three';

export type WithTexturesActor = {
  useTexture: (maps: MeshBasicMaterialParameters) => void;
};
