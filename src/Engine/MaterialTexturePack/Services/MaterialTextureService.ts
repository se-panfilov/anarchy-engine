import type { IMaterialParams, IMaterialService, IMaterialWrapper } from '@/Engine/Material';
import type { IMaterialPackProps, IMaterialTexturePack, IMaterialTextureService } from '@/Engine/MaterialTexturePack';
import type { ITextureService, ITextureUploaded } from '@/Engine/Texture';

export function MaterialTextureService(materialService: IMaterialService, textureService: ITextureService): IMaterialTextureService {
  const createAsync = (pack: IMaterialPackProps<IMaterialTexturePack>): Promise<IMaterialWrapper> => {
    // TODO (S.Panfilov) this is the same code as mixin "withTextures"
    return textureService
      .load(pack)
      .all()
      .then((textures: ITextureUploaded) => {
        const params: IMaterialParams = pack.params ?? ({} as IMaterialParams);
        return materialService.create({ ...params, ...textures, type: pack.type });
      });
  };

  return { createAsync };
}
