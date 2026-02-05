import type { TTextureService } from '@hellpig/anarchy-engine/Texture';

export type TMaterialServiceDependencies = Readonly<{
  textureService: TTextureService;
}>;
