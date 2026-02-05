import type { TWithMaterial } from '@hellpig/anarchy-engine/Material/Models';
import type { TRawModel3d } from '@hellpig/anarchy-engine/Models3d';
import type { TWriteable } from '@hellpig/anarchy-shared/Utils';
import { isDefined } from '@hellpig/anarchy-shared/Utils';
import type { Group, Material, Mesh, Object3D } from 'three';
import type { Points } from 'three/src/objects/Points';

export function withMaterial<T extends TWriteable<TRawModel3d | Points>>(entity: T): TWithMaterial {
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
