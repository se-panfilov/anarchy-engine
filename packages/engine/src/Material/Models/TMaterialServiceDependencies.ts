import type { TTextureService } from '@/Texture';

export type TMaterialServiceDependencies = Readonly<{
  textureService: TTextureService;
}>;
