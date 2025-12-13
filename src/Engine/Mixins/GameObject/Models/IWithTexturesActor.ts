import type { MeshBasicMaterialParameters } from 'three';

export type IWithTexturesActor = {
  useTexture: (maps: MeshBasicMaterialParameters) => void;
};
