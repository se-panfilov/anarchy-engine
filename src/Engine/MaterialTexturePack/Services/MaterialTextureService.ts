import type { IMaterialParams, IMaterialProps, IMaterialService, IMaterialWrapper } from '@/Engine/Material';
import type { IMaterialPackParams, IMaterialTexturePack, IMaterialTextureService } from '@/Engine/MaterialTexturePack';
import type { ITextureService, ITextureUploaded } from '@/Engine/Texture';

export function MaterialTextureService(materialService: IMaterialService, textureService: ITextureService): IMaterialTextureService {
  const createAsync = (pack: IMaterialPackParams<IMaterialTexturePack>): Promise<IMaterialWrapper> => {
    return textureService
      .load(pack)
      .all()
      .then((textures: ITextureUploaded) => {
        const params: IMaterialProps = pack.params ?? ({} as IMaterialProps);
        return materialService.create({ ...params, ...textures, type: pack.type } satisfies IMaterialParams);
      });
  };

  return { createAsync };
}
