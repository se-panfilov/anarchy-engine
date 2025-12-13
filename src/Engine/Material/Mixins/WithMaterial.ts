import type { Material } from 'three';

import type { TWithMaterial } from '@/Engine/Material/Models';
import type { TMesh, TPoints } from '@/Engine/ThreeLib';
import type { TWriteable } from '@/Engine/Utils';

export function withMaterial<T extends TWriteable<TMesh | TPoints>>(entity: T): TWithMaterial {
  function useMaterial(material: Material): Material {
    // eslint-disable-next-line functional/immutable-data
    entity.material = material;
    return material;
  }

  return {
    useMaterial
  };
}
