import type { TMaterialParams, TMaterialProps, TMaterialService, TMaterialWrapper } from '@/Engine/Material';
import type { TMaterialPackParams, TMaterialTexturePack, TMaterialTextureService, TMaterialTextureServiceDependencies } from '@/Engine/MaterialTexturePack';
import type { TTextureUploaded } from '@/Engine/Texture';

export function MaterialTextureService(materialService: TMaterialService, { textureService }: TMaterialTextureServiceDependencies): TMaterialTextureService {
  // TODO 9.0.0. RESOURCES: This method should be removed (prefer) or refactored: textures are loaded before materials,
  //  and when create a material with a texture, the texture should be taken from a registry
  const createAsync = (pack: TMaterialPackParams<TMaterialTexturePack>): Promise<TMaterialWrapper> => {
    return textureService
      .loadMaterialPack(pack)
      .all()
      .then((textures: TTextureUploaded) => {
        const params: TMaterialProps = pack.params ?? ({} as TMaterialProps);
        return materialService.create({ ...params, ...textures, type: pack.type } satisfies TMaterialParams);
      });
  };

  return { createAsync };
}
