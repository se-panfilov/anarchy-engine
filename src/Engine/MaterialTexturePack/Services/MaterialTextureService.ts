import type { TMaterialParams, TMaterialProps, TMaterialService, TMaterialWrapper } from '@/Engine/Material';
import type { TMaterialPackConfig, TMaterialPackParams, TMaterialTexturePack, TMaterialTextureService } from '@/Engine/MaterialTexturePack';
import type { TTextureService, TTextureUploaded } from '@/Engine/Texture';

// TODO 9.0.0. RESOURCES: add dependencies object
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

  // TODO 9.0.0. RESOURCES: Add factory
  // TODO 9.0.0. RESOURCES: Add registry (registry will be needed later for create with overrides)
  // TODO 9.0.0. RESOURCES: Add reactivity
  const createFromConfigAsync = (packs: ReadonlyArray<TMaterialPackConfig<TMaterialTexturePack>>): void => {
    packs.forEach((pack: TMaterialPackConfig<TMaterialTexturePack>): void => createAsync(pack));
  };

  const createFromConfigAsync = (packs: ReadonlyArray<TMaterialPackConfig<TMaterialTexturePack>>): void => {
    packs.forEach((config: TMaterialPackConfig<TMaterialTexturePack>): void => factory.create(factory.configToParams(config)));
  };

  // TODO 9.0.0. RESOURCES: add destroyable mixin

  return { createAsync, createFromConfigAsync };
}
