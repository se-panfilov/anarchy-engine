import type { Material } from 'three';

import type { IMaterialWrapper, IWithMaterial } from '@/Engine/Material';
import type { IMaterialPackParams, IMaterialTexturePack, IMaterialTextureService } from '@/Engine/MaterialTexturePack';
import type { IWithTextures } from '@/Engine/Texture/Models';

export function withTextures<T extends IWithMaterial>(entity: T, materialTextureService: IMaterialTextureService): IWithTextures {
  function loadAndApplyMaterialTexturePack(pack: IMaterialPackParams<IMaterialTexturePack>): Promise<Material> {
    return materialTextureService.createAsync(pack).then((materialWrapper: IMaterialWrapper) => entity.useMaterial(materialWrapper.entity));
  }

  return { loadAndApplyMaterialTexturePack };
}
