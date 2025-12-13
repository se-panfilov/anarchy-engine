import type { Material } from 'three';

import type { IMaterialProps, IWithMaterialActor } from '@/Engine/Material';
import { materialService } from '@/Engine/Material';
import { textureService } from '@/Engine/Texture';
import type { IMaterialTexturePack, ITextureUploaded, IWithTexturesActor } from '@/Engine/Texture/Models';

export function withTexturesActor<T extends IWithMaterialActor>(entity: T): IWithTexturesActor {
  function loadAndApplyMaterialTexturePack(pack: IMaterialProps<IMaterialTexturePack>): Promise<Material> {
    return textureService
      .load(pack)
      .all()
      .then((mt: ITextureUploaded) => entity.useMaterial(materialService.buildMaterial(pack.type, pack.params, mt)));
  }

  return {
    loadAndApplyMaterialTexturePack
  };
}
