import type { Material } from 'three';

import type { TMaterialWrapper, TWithMaterial } from '@/Engine/Material';
import type { IMaterialPackParams, TMaterialTexturePack, TMaterialTextureService } from '@/Engine/MaterialTexturePack';
import type { IWithTextures } from '@/Engine/Texture/Models';

export function withTextures<T extends TWithMaterial>(entity: T, materialTextureService: TMaterialTextureService): IWithTextures {
  function loadAndApplyMaterialTexturePack(pack: IMaterialPackParams<TMaterialTexturePack>): Promise<Material> {
    return materialTextureService.createAsync(pack).then((materialWrapper: TMaterialWrapper) => entity.useMaterial(materialWrapper.entity));
  }

  return { loadAndApplyMaterialTexturePack };
}
