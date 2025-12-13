import type { TMaterialParams, TMaterialProps, TMaterialService, TMaterialWrapper } from '@/Engine/Material';
import type { TMaterialPackParams, TMaterialTexturePack, TMaterialTextureService } from '@/Engine/MaterialTexturePack';
import type { TTextureService, TTextureUploaded } from '@/Engine/Texture';

export function MaterialTextureService(materialService: TMaterialService, textureService: TTextureService): TMaterialTextureService {
  const createAsync = (pack: TMaterialPackParams<TMaterialTexturePack>): Promise<TMaterialWrapper> => {
    return textureService
      .load(pack)
      .all()
      .then((textures: TTextureUploaded) => {
        const params: TMaterialProps = pack.params ?? ({} as TMaterialProps);
        return materialService.create({ ...params, ...textures, type: pack.type } satisfies TMaterialParams);
      });
  };

  return { createAsync };
}
