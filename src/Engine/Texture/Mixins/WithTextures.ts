import type { Material } from 'three';

import type { IMaterialProps, IWithMaterial } from '@/Engine/Material';
import { materialService } from '@/Engine/Material';
import { textureService } from '@/Engine/Texture';
import type { IMaterialTexturePack, ITextureUploaded, IWithTextures } from '@/Engine/Texture/Models';

export function withTextures<T extends IWithMaterial>(entity: T): IWithTextures {
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
