import type { TMaterialParams, TMaterialProps, TMaterialService, TMaterialWrapper } from '@/Engine/Material';
import type { TMaterialPackParams, TMaterialTexturePack, TMaterialTextureService, TMaterialTextureServiceDependencies } from '@/Engine/MaterialTexturePack';
import type { TTextureUploaded } from '@/Engine/Texture';

export function MaterialTextureService(materialService: TMaterialService, { textureService }: TMaterialTextureServiceDependencies): TMaterialTextureService {
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
