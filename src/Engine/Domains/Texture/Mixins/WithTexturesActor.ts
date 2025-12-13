import type { IWithMaterialActor } from '@/Engine/Domains/Material';
import { materialService } from '@/Engine/Domains/Material';
import { textureService } from '@/Engine/Domains/Texture';
import type { IMaterialTexturePack, IMaterialTextureUploaded, IWithTexturesActor } from '@/Engine/Domains/Texture/Models';

export function withTexturesActor<T extends IWithMaterialActor>(entity: T): IWithTexturesActor {
  function loadAndApplyMaterialTexturePack(pack: IMaterialTexturePack): Promise<void> {
    return textureService
      .load(pack)
      .all()
      .then((mt: IMaterialTextureUploaded) => entity.useMaterial(materialService.buildMaterial(mt)));
  }

  return {
    loadAndApplyMaterialTexturePack
  };
}
