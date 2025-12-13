import type { Material } from 'three';

import type { IMesh } from '@/Engine/Actor';
import type { IWithMaterialActor } from '@/Engine/Material/Models';
import type { IWriteable } from '@/Engine/Utils';

export function withMaterialActor<T extends IWriteable<IMesh>>(entity: T): IWithMaterialActor {
  function useMaterial(material: Material): Material {
    // eslint-disable-next-line functional/immutable-data
    entity.material = material;
    return material;
  }

  return {
    useMaterial
  };
}
