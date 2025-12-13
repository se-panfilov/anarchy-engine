import type { Material } from 'three';

import type { IMaterialWrapper, IWithMaterial } from '@/Engine/Material';
import type { IMaterialPackParams, TMaterialTexturePack, TMaterialTextureService } from '@/Engine/MaterialTexturePack';
import type { IWithTextures } from '@/Engine/Texture/Models';

export function withTextures<T extends IWithMaterial>(entity: T, materialTextureService: TMaterialTextureService): IWithTextures {
  function loadAndApplyMaterialTexturePack(pack: IMaterialPackParams<TMaterialTexturePack>): Promise<Material> {
    return materialTextureService.createAsync(pack).then((materialWrapper: IMaterialWrapper) => entity.useMaterial(materialWrapper.entity));
  }

  return { loadAndApplyMaterialTexturePack };
}
