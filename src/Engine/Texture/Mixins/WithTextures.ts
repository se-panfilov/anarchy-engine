import type { Material } from 'three';

import type { TMaterialWrapper, TWithMaterial } from '@/Engine/Material';
import type { TMaterialPackParams, TMaterialTexturePack, TMaterialTextureService } from '@/Engine/MaterialTexturePack';
import type { TWithTextures } from '@/Engine/Texture/Models';

export function withTextures<T extends TWithMaterial>(entity: T, materialTextureService: TMaterialTextureService): TWithTextures {
  function loadAndApplyMaterialTexturePack(pack: TMaterialPackParams<TMaterialTexturePack>): Promise<Material> {
    return materialTextureService.createAsync(pack).then((materialWrapper: TMaterialWrapper) => entity.useMaterial(materialWrapper.entity));
  }

  return { loadAndApplyMaterialTexturePack };
}
