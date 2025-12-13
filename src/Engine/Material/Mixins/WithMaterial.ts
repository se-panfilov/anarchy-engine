import type { Material } from 'three';

import type { IWithMaterial } from '@/Engine/Material/Models';
import type { IMesh, IPoints } from '@/Engine/ThreeLib';
import type { TWriteable } from '@/Engine/Utils';

export function withMaterial<T extends TWriteable<IMesh | IPoints>>(entity: T): IWithMaterial {
  function useMaterial(material: Material): Material {
    // eslint-disable-next-line functional/immutable-data
    entity.material = material;
    return material;
  }

  return {
    useMaterial
  };
}
