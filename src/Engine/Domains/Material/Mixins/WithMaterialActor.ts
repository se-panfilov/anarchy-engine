import type { Material } from 'three';

import type { IMesh } from '@/Engine/Domains/Actor';
import type { IWithMaterialActor } from '@/Engine/Domains/Material/Models';
import type { IWriteable } from '@/Engine/Utils';

export function withMaterialActor<T extends IWriteable<IMesh>>(entity: T): IWithMaterialActor {
  function useMaterial(material: Material): void {
    // eslint-disable-next-line functional/immutable-data
    entity.material = material;
  }

  return {
    useMaterial
  };
}
