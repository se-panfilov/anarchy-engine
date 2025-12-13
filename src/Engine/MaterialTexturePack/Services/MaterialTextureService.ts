import type { IMaterialParams, IMaterialProps, IMaterialService, IMaterialWrapper } from '@/Engine/Material';
import type { IMaterialPackParams, TMaterialTexturePack, TMaterialTextureService } from '@/Engine/MaterialTexturePack';
import type { ITextureService, ITextureUploaded } from '@/Engine/Texture';

export function MaterialTextureService(materialService: IMaterialService, textureService: ITextureService): TMaterialTextureService {
  const createAsync = (pack: IMaterialPackParams<TMaterialTexturePack>): Promise<IMaterialWrapper> => {
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
