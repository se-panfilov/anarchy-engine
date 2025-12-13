import type { TMaterialParams, TMaterialProps, TMaterialService, TMaterialWrapper } from '@/Engine/Material';
import type { IMaterialPackParams, TMaterialTexturePack, TMaterialTextureService } from '@/Engine/MaterialTexturePack';
import type { ITextureService, ITextureUploaded } from '@/Engine/Texture';

export function MaterialTextureService(materialService: TMaterialService, textureService: ITextureService): TMaterialTextureService {
  const createAsync = (pack: IMaterialPackParams<TMaterialTexturePack>): Promise<TMaterialWrapper> => {
    return textureService
      .load(pack)
      .all()
      .then((textures: ITextureUploaded) => {
        const params: TMaterialProps = pack.params ?? ({} as TMaterialProps);
        return materialService.create({ ...params, ...textures, type: pack.type } satisfies TMaterialParams);
      });
  };

  return { createAsync };
}
