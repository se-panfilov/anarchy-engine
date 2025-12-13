import type { Group, Material, Mesh, Object3D } from 'three';
import type { Points } from 'three/src/objects/Points';

import type { TWithMaterial } from '@/Engine/Material/Models';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';

export function withMaterial<T extends TWriteable<Mesh | Group | Points>>(entity: T): TWithMaterial {
  function useMaterial(material: Material): Material {
    if ((entity as Group).isGroup) {
      entity.traverse((object) => hasMaterial(object) && applyMaterial(object, material));
    } else if (hasMaterial(entity)) applyMaterial(entity, material);
    return material;
  }

  return {
    useMaterial
  };
}

const hasMaterial = (entity: Mesh | Group | Points | Object3D): boolean => isDefined((entity as Mesh).material);
// eslint-disable-next-line functional/immutable-data
const applyMaterial = (entity: Mesh | Group | Points | Object3D, material: Material): void => void ((entity as Mesh).material = material);
