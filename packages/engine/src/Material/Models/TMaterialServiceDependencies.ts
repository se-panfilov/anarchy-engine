import type { TTextureService } from '@/Engine/Texture';

export type TMaterialServiceDependencies = Readonly<{
  textureService: TTextureService;
}>;
