import { MeshBasicMaterial } from 'three';
import type { MeshBasicMaterialParameters } from 'three/src/materials/MeshBasicMaterial';

import type { IMesh } from '@/Engine/Domains/Actor';
import type { WithTexturesActor } from '@/Engine/Mixins/GameObject/Models';
import type { IWriteable } from '@/Engine/Utils';

export function withTexturesActor<T extends IWriteable<IMesh>>(entity: T): WithTexturesActor {
  function useTexture(maps: MeshBasicMaterialParameters): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,functional/immutable-data
    entity.material = new MeshBasicMaterial(maps);
  }

  return {
    useTexture
  };
}
