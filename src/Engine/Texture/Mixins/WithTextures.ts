import type { Material } from 'three';

import type { IMaterialPackProps, IMaterialService, IWithMaterial } from '@/Engine/Material';
import { textureService } from '@/Engine/Texture';
import type { IMaterialTexturePack, ITextureUploaded, IWithTextures } from '@/Engine/Texture/Models';

export function withTextures<T extends IWithMaterial>(entity: T, materialService: IMaterialService): IWithTextures {
  function loadAndApplyMaterialTexturePack(pack: IMaterialPackProps<IMaterialTexturePack>): Promise<Material> {
    // TODO (S.Panfilov) remove eslint
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return (
      textureService
        .load(pack)
        .all()
        // .then((mt: ITextureUploaded) => entity.useMaterial(materialService.buildMaterial(pack.type, pack.params, mt)));
        .then((mt: ITextureUploaded) => {
          // TODO (S.Panfilov) debug
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return console.log(entity, mt, materialService) as any;
          // TODO (S.Panfilov) CWP FIX this or remove
          // materialService.createAsync(pack.type, pack.params, mt).then((material: Material) => entity.useMaterial(material));
        })
    );
  }

  return {
    loadAndApplyMaterialTexturePack
  };
}
