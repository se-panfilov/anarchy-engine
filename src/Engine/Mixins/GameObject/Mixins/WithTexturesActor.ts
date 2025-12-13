import { MeshBasicMaterial } from 'three';
import type { MeshBasicMaterialParameters } from 'three/src/materials/MeshBasicMaterial';

import type { IMesh } from '@/Engine/Domains/Actor';
import type { ITexturePack, ITextureUploaded, ITextureUploadPromises } from '@/Engine/Domains/Texture';
import { textureService } from '@/Engine/Domains/Texture';
import type { IWithTexturesActor } from '@/Engine/Mixins/GameObject/Models';
import type { IWriteable } from '@/Engine/Utils';

export function withTexturesActor<T extends IWriteable<IMesh>>(entity: T): IWithTexturesActor {
  function useTexture(maps: MeshBasicMaterialParameters): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,functional/immutable-data
    entity.material = new MeshBasicMaterial(maps);
  }

  function loadTexturePack(texturePack: ITexturePack): Promise<void> {
    const textures: ITextureUploadPromises = textureService.load(texturePack);
    return textures.all().then((textures: ITextureUploaded) => useTexture({ ...textures }));
  }

  return {
    useTexture,
    loadTexturePack
  };
}
