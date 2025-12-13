import { MeshBasicMaterial } from 'three';
import type { MeshBasicMaterialParameters } from 'three/src/materials/MeshBasicMaterial';

import type { IMesh } from '@/Engine/Domains/Actor';
import type { IMaterialTexturePack, IMaterialTextureUploaded, IMaterialTextureUploadPromises } from '@/Engine/Domains/Texture';
import { textureService } from '@/Engine/Domains/Texture';
import type { IWithTexturesActor } from '@/Engine/Mixins/GameObject/Models';
import type { IWriteable } from '@/Engine/Utils';

export function withTexturesActor<T extends IWriteable<IMesh>>(entity: T): IWithTexturesActor {
  function useTextureAsMaterial(maps: MeshBasicMaterialParameters): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,functional/immutable-data
    entity.material = new MeshBasicMaterial(maps);
  }

  function loadTexturePack(texturePack: IMaterialTexturePack): Promise<void> {
    const textures: IMaterialTextureUploadPromises = textureService.load(texturePack);
    return textures.all().then((textures: IMaterialTextureUploaded) => useTextureAsMaterial({ ...textures }));
  }

  return {
    useTextureAsMaterial,
    loadTexturePack
  };
}
